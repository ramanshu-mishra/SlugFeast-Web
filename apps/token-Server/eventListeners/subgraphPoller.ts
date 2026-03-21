import { prisma } from "@repo/database/client";
import { broadcast } from "../wsLayer/transactions.js";
import { EventType, TransactionEvents } from "../share/enums.js";

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
    tokenCreateds:   { lastTimestamp: "0", lastId: "" },
    tokenDeployeds:  { lastTimestamp: "0", lastId: "" },
    tokenGraduateds: { lastTimestamp: "0", lastId: "" },
    tokenBoughts:    { lastTimestamp: "0", lastId: "" },
    tokenSolds:      { lastTimestamp: "0", lastId: "" },
    poolcreateds:    { lastTimestamp: "0", lastId: "" },
};

const CURSOR_DB_ENTITIES = [
    "tokenCreateds",
    "tokenDeployeds",
    "tokenGraduateds",
    "tokenBoughts",
    "tokenSolds",
    "poolcreateds",
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
    tokenCreateds: (c: Cursor) => `{
        tokenCreateds(
            where: { ${whereClause(c)} }
            orderBy: blockTimestamp
            orderDirection: asc
            first: ${PAGE_SIZE}
        ) { id token internal_id blockNumber blockTimestamp transactionHash }
    }`,

    tokenDeployeds: (c: Cursor) => `{
        tokenDeployeds(
            where: { ${whereClause(c)} }
            orderBy: blockTimestamp
            orderDirection: asc
            first: ${PAGE_SIZE}
        ) { id token blockNumber blockTimestamp transactionHash }
    }`,

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

    poolcreateds: (c: Cursor) => `{
        poolcreateds(
            where: { ${whereClause(c)} }
            orderBy: blockTimestamp
            orderDirection: asc
            first: ${PAGE_SIZE}
        ) { id tokenA blockNumber blockTimestamp transactionHash }
    }`,
};

// ─── Handlers ────────────────────────────────────────────────────────────────
async function handleTokenCreateds(rows: any[]) {
    for (const row of rows) {
        // Update the coin's on-chain address using the subgraph-provided token address
        console.log(row,"\n");
        const coin = await prisma.coin.findFirst({ where: { id: row.internal_id } });
        if (!coin) {
            console.log(JSON.stringify({ event: "TokenCreated", status: "coin_not_found", id: row.internal_id }));
            continue;
        }
        console.log("\n\n__got the coin__ : ", row.internal_id), "\n\n";
        await prisma.coin.update({
            where: { id: row.internal_id },
            data: { address: row.token },
        });
        broadcast(EventType.tokenCreated, row);
        console.log(JSON.stringify({ event: "TokenCreated", id: row.internal_id, address: row.token }));
    }
}

async function handleTokenDeployeds(rows: any[]) {
    for (const row of rows) {
        // broadcast(EventType.tokenDeployed, row);
        console.log(JSON.stringify({ event: "tokenDeployed", token: row.token, block: row.blockNumber }));
    }
}

async function handleTokenGraduateds(rows: any[]) {
    for (const row of rows) {
        // Mark the coin as graduated by its contract address
        const updated = await prisma.coin.updateMany({
            where: { address: row.token.toLowerCase() },
            data: { graduated: true },
        });
        broadcast(EventType.tokenGraduated, row);
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
        broadcast(TransactionEvents.tokenBought, row);
        console.log(JSON.stringify({
            event: "TokenBought",
            token: row.token,
            VETH: row.VETH,
            amount: row.amount,
            buyer: row.buyer,
            block: row.blockNumber,
            txHash: row.transactionHash,
        }));
        await updateHoldingInfo(row.buyer, row.token, row.amount, "buy", row.blockNumber, row.transactionHash);
    }
}

async function handleTokenSolds(rows: any[]) {
    for (const row of rows) {
        broadcast(TransactionEvents.tokenSold, row);
        console.log(JSON.stringify({
            event: "TokenSold",
            token: row.token,
            VETH: row.VETH,
            amount: row.amount,
            seller: row.seller,
            block: row.blockNumber,
            txHash: row.transactionHash,
        }));
        await updateHoldingInfo(row.seller, row.token, row.amount, "sell", row.blockNumber, row.transactionHash);
    }
    
}

async function handlePoolcreateds(rows: any[]) {
    for (const row of rows) {
        // broadcast(EventType.poolcreated, row);
        console.log(JSON.stringify({ event: "poolcreated", tokenA: row.tokenA, block: row.blockNumber }));
    }
}




const handlers: Record<string, (rows: any[]) => Promise<void>> = {
    tokenCreateds:  handleTokenCreateds,
    tokenDeployeds: handleTokenDeployeds,
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


function getPersistedCursorSnapshot(): Record<CursorDbEntity, Cursor> {
    return Object.fromEntries(
        CURSOR_DB_ENTITIES.map((entity) => [entity, { ...cursor[entity] }])
    ) as Record<CursorDbEntity, Cursor>;
}

function areCursorMapsEqual(mp1: Record<CursorDbEntity, Cursor>, mp2: Record<CursorDbEntity, Cursor>) {
    for (const key of CURSOR_DB_ENTITIES) {
        if (mp1[key].lastTimestamp !== mp2[key].lastTimestamp || mp1[key].lastId !== mp2[key].lastId) {
            return false;
        }
    }
    return true;
}

function toCursorNumber(value?: string): number {
    const parsed = Number(value ?? 0);
    return Number.isFinite(parsed) ? parsed : 0;
}





// --- TimeStampSaver

function saveTimeStamp(){
    let prev = getPersistedCursorSnapshot();
    let isSaving = false;

    async function updateTimeStamps(){

        const updatedTimeStamp = {
            tokenDeployedsTimestamp: toCursorNumber(cursor["tokenDeployeds"]?.lastTimestamp),
            tokenDeployedsLastId: toCursorNumber(cursor["tokenDeployeds"]?.lastId),

            tokenGraduatedsTimestamp: toCursorNumber(cursor["tokenGraduateds"]?.lastTimestamp),
            tokenGraduatedsLastId: toCursorNumber(cursor["tokenGraduateds"]?.lastId),

            poolcreatedsTimestamp: toCursorNumber(cursor["poolcreateds"]?.lastTimestamp),
            poolcreatedsLastId: toCursorNumber(cursor["poolcreateds"]?.lastId),

            tokencreatedsTimestamp : toCursorNumber(cursor["tokenCreateds"]?.lastTimestamp),
            tokencreatedLastId : toCursorNumber(cursor["tokenCreateds"]?.lastId)
        }

        await prisma.blockTimeStamps.upsert({
            where:{
                id: "singleton"
            },
            update: updatedTimeStamp,
            create: { id: "singleton", ...updatedTimeStamp }
        });

        prev = getPersistedCursorSnapshot();
    }

    setInterval(async()=>{
        if (isSaving) return;

        const unchanged = areCursorMapsEqual(getPersistedCursorSnapshot(), prev);
        if (!unchanged) {
            isSaving = true;
            try {
                await updateTimeStamps();
            } catch (error) {
                console.error("[SubgraphPoller] saveTimeStamp error:", error);
            } finally {
                isSaving = false;
            }
        }
    }, SAVE_INTERVAL) // I think this function may lead to some performance issues. lets say update didn't happen and another async request came, then prev request must cancel. I dont know if this is implicitly being handled by nodejs.
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


async function updateHoldingInfo(userAddress: string, tokenAddress: string, amount: number, action: "buy" | "sell", blockTimestamp: number, lastId: number) {
    
    const change = action === "buy" ? Number(amount) : -Number(amount);

    try {
        prisma.$transaction([
            prisma.holding.upsert({
            where: {
                // @ts-ignore
                coinId_userAddress: {
                    userAddress,
                    coinId: tokenAddress
                }
            },
            create: {
                userAddress,
                coinId: tokenAddress,
                amount: action === "buy" ? Number(amount) : 0 // Don't create negative holdings on first sell
            },
            update: {
                amount: {
                    increment: change 
                }
            }
        }),
        action == "buy"?
        prisma.blockTimeStamps.update({
            where: { id: "singleton" },
            data: {
                tokenBoughtsTimestamp: blockTimestamp,
                tokenBoughtsLastId: lastId
            }
        }):
        prisma.blockTimeStamps.update({
            where: { id: "singleton" },
            data: {
                tokenSoldsTimestamp: blockTimestamp,
                tokenSoldsLastId: lastId
            }
        })
        ]);
    } catch (e) {
        console.error(`Update failed for ${tokenAddress}:`, e instanceof Error ? e.message : e);
    }
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
        console.log("____yo___fetched_something______");
    }, POLL_INTERVAL_MS);
    saveTimeStamp();
}




// kaam to do right now: --> write endpoints to fetch trading history indexed by the indexer according to dates sorted according to timestams.
// fetched data should be converted to whether in terms of Eth or Token is needed or send both at the same time . only one extra column required.
// 

// add support different timeZone view on the timeline

// add comment section

// I dont want frontend to poll server for this kind of stuff 
// so create a simple WebSocket connection between server and client to fetch transaction data and tokenPool status to display the bonding curve. 


// after all this is completed ad support of all the small things on frontend that remain for goo UX .

// after all this real thing begins that makes the project long term .
// 
// allowing all this from the uniswap contract. which means indexging and allowing trades after graduation from the platform itself. 

// after this deploy and allow public to trade. 

