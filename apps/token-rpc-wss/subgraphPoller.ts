import { prisma } from "@repo/database/client";
import { EventType, TransactionEvents } from "./share/enum.js";
import { TokenRPC } from "./TokenRPC.js";


const TokenManager = TokenRPC.getTokenRPC();
const SUBGRAPH_URL = process.env.SUBGRAPH_URL as string;
const SUBGRAPH_HEADER = `Bearer ${process.env.SUBGRAPH_API_KEY}`;
const POLL_INTERVAL_MS = 2_000;
const SAVE_INTERVAL = 20_000; // 20 seconds

// ─── In-memory cursors ───────────────────────────────────────────────────────
// lastTimestamp: advance only when the batch has fewer than PAGE_SIZE rows
// lastId:        used with blockTimestamp_gte + id_gt to page within a block
const PAGE_SIZE = 100;

interface Cursor { lastTimestamp: string; lastId: string; }
const cursor: Record<string, Cursor> = {
    tokenGraduateds: { lastTimestamp: "0", lastId: "" },
    tokenBoughts:    { lastTimestamp: "0", lastId: "" },
    tokenSolds:      { lastTimestamp: "0", lastId: "" },
};

const CURSOR_DB_ENTITIES = [
    "tokenGraduateds",
    "tokenBoughts",
    "tokenSolds",
] as const;

type CursorDbEntity = (typeof CURSOR_DB_ENTITIES)[number];

// ─── GraphQL fetch helper ────────────────────────────────────────────────────
async function gql<T>(query: string): Promise<T> {
    const res = await fetch(SUBGRAPH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "Authorization": SUBGRAPH_HEADER
         },
        body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error(`Subgraph HTTP ${res.status}`);
    const json = await res.json() as { data: T; errors?: { message: string }[] };
    if (json.errors?.length) throw new Error(json.errors.map(e => e.message).join(", "));
    return json.data;
}

// ─── Query builders ──────────────────────────────────────────────────────────
// Uses blockTimestamp_gte + id_gt to safely page through events in the same block

function normalizeCursorId(value: string): string {
    const id = value.trim();
    if (id === "" || id === "0") return "";
    return /^0x(?:[a-fA-F0-9]{2})+$/.test(id) ? id : "";
}

function whereClause(c: Cursor): string {
    const safeId = normalizeCursorId(c.lastId);
    if (safeId === "") return `blockTimestamp_gt: "${c.lastTimestamp}"`;
    return `blockTimestamp_gte: "${c.lastTimestamp}", id_gt: "${safeId}"`;
}

const queries = {
    tokenGraduateds: (c: Cursor) => `{
        tokenGraduateds(
            where: { ${whereClause(c)} }
            orderBy: blockTimestamp
            orderDirection: asc
            first: ${PAGE_SIZE}
        ) { id token blockNumber blockTimestamp transactionHash }
    }`,

    tokenBoughts: (c: Cursor) => `{
        tokenBoughts(
            where: { ${whereClause(c)} }
            orderBy: blockTimestamp
            orderDirection: asc
            first: ${PAGE_SIZE}
        ) { id token VETH amount buyer blockNumber blockTimestamp transactionHash }
    }`,

    tokenSolds: (c: Cursor) => `{
        tokenSolds(
            where: { ${whereClause(c)} }
            orderBy: blockTimestamp
            orderDirection: asc
            first: ${PAGE_SIZE}
        ) { id token VETH amount seller blockNumber blockTimestamp transactionHash }
    }`,
};

// ─── Handlers ────────────────────────────────────────────────────────────────


async function handleTokenGraduateds(rows: any[]) {
    for (const row of rows) {
        // Mark the coin as graduated by its contract address
        const updated = await prisma.coin.updateMany({
            where: { address: row.token.toLowerCase() },
            data: { graduated: true },
        });
        TokenManager.broadCast(EventType.tokenGraduated, row);
        console.log(JSON.stringify({
            event: "tokenGraduated",
            token: row.token,
            updated: updated.count,
            block: row.blockNumber,
        }));
    }
}

async function handleTokenBoughts(rows: any[]) {
    for (const row of rows) {
        TokenManager.broadCast(TransactionEvents.tokenBought, row);
        console.log(JSON.stringify({
            event: "TokenBought",
            token: row.token,
            VETH: row.VETH,
            amount: row.amount,
            buyer: row.buyer,
            block: row.blockNumber,
            txHash: row.transactionHash,
        }));
        
    }
}

async function handleTokenSolds(rows: any[]) {
    for (const row of rows) {
        TokenManager.broadCast(TransactionEvents.tokenSold, row);
        console.log(JSON.stringify({
            event: "TokenSold",
            token: row.token,
            VETH: row.VETH,
            amount: row.amount,
            seller: row.seller,
            block: row.blockNumber,
            txHash: row.transactionHash,
        }));
       
    }
    
}



async function handlePoolcreateds(rows: any[]) {
    for (const row of rows) {
        // broadcast(EventType.poolcreated, row);
        console.log(JSON.stringify({ event: "poolcreated", tokenA: row.tokenA, block: row.blockNumber }));
    }
}




const handlers: Record<string, (rows: any[]) => Promise<void>> = {
    tokenGraduateds:handleTokenGraduateds,
    tokenBoughts:   handleTokenBoughts,
    tokenSolds:     handleTokenSolds,
    poolcreateds:   handlePoolcreateds,
};

// ─── Poll loop ────────────────────────────────────────────────────────────────
async function poll() {
    const entityNames = Object.keys(queries) as (keyof typeof queries)[];

    await Promise.all(
        entityNames.map(async (entity) => {
            try {
                const data = await gql<Record<string, any[]>>(
                    queries[entity](cursor[entity] as Cursor)
                );
                const rows: any[] = data[entity] ?? [];
                if (rows.length === 0) return;

                await handlers[entity]?.(rows);

                const last = rows[rows.length - 1];
                if (rows.length === PAGE_SIZE) {
                    // Full page — there may be more rows in this same block;
                    // keep timestamp, advance id so next poll continues from here
                    cursor[entity] = { lastTimestamp: last.blockTimestamp, lastId: last.id };
                } else {
                    // Partial page — all events for this timestamp consumed;
                    // advance timestamp so next poll skips past it entirely
                    cursor[entity] = { lastTimestamp: last.blockTimestamp, lastId: "" };
                }
            } catch (err) {
                console.error(`[SubgraphPoller] ${entity} error:`, err);
            }
        })
    );
}




// fetching the timestamp from which indexing should start , instead of starting from the epoch everytime

async function fetchCursors(){
    const tmstpms = await prisma.blockTimeStamps.findUnique({ where: { id: "singleton" } });
    if(!tmstpms)return;

    cursor.tokenCreateds = {
        lastTimestamp: String(tmstpms.tokencreatedsTimestamp),
        lastId: normalizeCursorId(String(tmstpms.tokencreatedLastId)),
    };

    cursor.tokenDeployeds = {
        lastTimestamp: String(tmstpms.tokenDeployedsTimestamp),
        lastId: normalizeCursorId(String(tmstpms.tokenDeployedsLastId)),
    };
    cursor.tokenGraduateds = {
        lastTimestamp: String(tmstpms.tokenGraduatedsTimestamp),
        lastId: normalizeCursorId(String(tmstpms.tokenGraduatedsLastId)),
    };
    cursor.tokenBoughts = {
        lastTimestamp: String(tmstpms.tokenBoughtsTimestamp),
        lastId: normalizeCursorId(String(tmstpms.tokenBoughtsLastId)),
    };
    cursor.tokenSolds = {
        lastTimestamp: String(tmstpms.tokenSoldsTimestamp),
        lastId: normalizeCursorId(String(tmstpms.tokenSoldsLastId)),
    };
    cursor.poolcreateds = {
        lastTimestamp: String(tmstpms.poolcreatedsTimestamp),
        lastId: normalizeCursorId(String(tmstpms.poolcreatedsLastId)),
    };
}











// ─── Entry point ──────────────────────────────────────────────────────────────
export async function startSubgraphPoller() {
    if (!SUBGRAPH_URL) {
        console.error("[SubgraphPoller] SUBGRAPH_URL not set — poller disabled");
        return;
    }
    await fetchCursors();
    console.log("mai pass ho gaya HEHEHEHEHEHE"); 
    console.log(`[SubgraphPoller] starting — polling every ${POLL_INTERVAL_MS}ms`);
    poll().catch((e) => console.error("[SubgraphPoller] initial poll error:", e));
    setInterval(() => {
        poll().catch((e) => console.error("[SubgraphPoller] poll error:", e));
        // console.log("____yo___fetched_something______");
    }, POLL_INTERVAL_MS);
}





