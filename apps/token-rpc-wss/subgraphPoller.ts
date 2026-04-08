import { prisma } from "@repo/database/client";
import { TokenRPC } from "./TokenRPC.js";


let tokenManager: TokenRPC | null = null;
const SUBGRAPH_URL = process.env.SUBGRAPH_URL as string;
const SUBGRAPH_HEADER = `Bearer ${process.env.SUBGRAPH_API_KEY}`;
const POLL_INTERVAL_MS = 1_000;
const SAVE_INTERVAL = 20_000; // 20 seconds

// ─── In-memory cursors ───────────────────────────────────────────────────────
// lastTimestamp: advance only when the batch has fewer than PAGE_SIZE rows
// lastId:        used with blockTimestamp_gte + id_gt to page within a block
const PAGE_SIZE = 100;

interface Cursor { lastTimestamp: bigint; lastId: bigint; }
const cursor: Record<CursorDbEntity, Cursor> = {
    tokenGraduateds: { lastTimestamp: 0n, lastId: 0n },
    tokenBoughts:    { lastTimestamp: 0n, lastId: 0n },
    tokenSolds:      { lastTimestamp: 0n, lastId: 0n },
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

// ─── Query builders ─────────────────────────────────────────────────────────-
// Uses blockTimestamp_gte + id_gt to safely page through events in the same block

function parseSubgraphId(value: unknown): bigint {
    if (typeof value === "string") {
        const trimmed = value.trim();
        if (trimmed === "" || trimmed === "0") return 0n;
        if (trimmed.startsWith("0x") || trimmed.startsWith("0X")) {
            try {
                return BigInt(trimmed);
            } catch {
                return 0n;
            }
        }
    }
    try {
        return BigInt(value as string | number | bigint);
    } catch {
        return 0n;
    }
}

function formatSubgraphId(value: bigint): string {
    if (value <= 0n) return "0x0";
    let hex = value.toString(16);
    if (hex.length % 2 === 1) hex = `0${hex}`;
    return `0x${hex.padStart(64, "0")}`;
}

function whereClause(c: Cursor): string {
    if (c.lastId <= 0n) return `blockTimestamp_gt: "${c.lastTimestamp.toString()}"`;

    // Continue within the same timestamp by id, but also allow all later timestamps.
    return `or: [
        { blockTimestamp_gt: "${c.lastTimestamp.toString()}" },
        {
            and: [
                { blockTimestamp: "${c.lastTimestamp.toString()}" },
                { id_gt: "${formatSubgraphId(c.lastId)}" }
            ]
        }
    ]`;
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
        ) { id token VETH amount sender poolTokens poolVETHs blockNumber blockTimestamp transactionHash }
    }`,

    tokenSolds: (c: Cursor) => `{
        tokenSolds(
            where: { ${whereClause(c)} }
            orderBy: blockTimestamp
            orderDirection: asc
            first: ${PAGE_SIZE}
        ) { id token VETH amount sender poolTokens poolVETHs blockNumber blockTimestamp transactionHash }
    }`,
};




async function handleTokenGraduateds(rows: any[]) {
    for (const row of rows) {
        // Mark the coin as graduated by its contract address
        const updated = await prisma.coin.updateMany({
            where: { address: row.token.toLowerCase() },
            data: { graduated: true },
        });
        
        //havent implemented yet what happens if the token graduates;
      
    }
    console.log("graduated info");
}

async function handleTokenBoughts(rows: any[]) {
    for (const row of rows) {
        await tokenManager?.updateClients(row, "buy");
        console.log(
            JSON.stringify({
                event: "TokenBought",
                token: row.token,
                VETH: row.VETH,
                amount: row.amount,
                sender: row.sender,
                poolTokens: row.poolTokens,
                poolVETHs: row.poolVETHs,
                block: row.blockNumber,
                txHash: row.transactionHash,
            })
        );
    }
}

async function handleTokenSolds(rows: any[]) {
    for (const row of rows) {
        await tokenManager?.updateClients(row, "sell");
        console.log(
            JSON.stringify({
                event: "TokenSold",
                token: row.token,
                VETH: row.VETH,
                amount: row.amount,
                sender: row.sender,
                poolTokens: row.poolTokens,
                poolVETHs: row.poolVETHs,
                block: row.blockNumber,
                txHash: row.transactionHash,
            })
        );
    }
}

async function handleTrades(buyRows: any[], sellRows: any[]) {
    const merged = [
        ...buyRows.map((row) => ({ event: "buy" as const, row })),
        ...sellRows.map((row) => ({ event: "sell" as const, row })),
    ];

    merged.sort((a, b) => {
        const aTs = BigInt(a.row.blockTimestamp ?? 0);
        const bTs = BigInt(b.row.blockTimestamp ?? 0);
        if (aTs < bTs) return -1;
        if (aTs > bTs) return 1;

        const aId = parseSubgraphId(a.row.id);
        const bId = parseSubgraphId(b.row.id);
        if (aId < bId) return -1;
        if (aId > bId) return 1;
        return 0;
    });

    for (const trade of merged) {
        await tokenManager?.updateClients(trade.row, trade.event);
        console.log(
            JSON.stringify({
                event: trade.event === "buy" ? "TokenBought" : "TokenSold",
                token: trade.row.token,
                VETH: trade.row.VETH,
                amount: trade.row.amount,
                sender: trade.row.sender,
                poolTokens: trade.row.poolTokens,
                poolVETHs: trade.row.poolVETHs,
                block: trade.row.blockNumber,
                txHash: trade.row.transactionHash,
            })
        );
    }
}


const handlers: Record<CursorDbEntity, (rows: any[]) => Promise<void>> = {
    tokenGraduateds:handleTokenGraduateds,
    tokenBoughts:   handleTokenBoughts,
    tokenSolds:     handleTokenSolds,
};


let pollInProgress = false;

async function poll() {
    if (pollInProgress) return;
    pollInProgress = true;
    const entityNames = Object.keys(queries) as (keyof typeof queries)[];

    try {
        const dataByEntity = await Promise.all(
            entityNames.map(async (entity) => {
                const data = await gql<Record<string, any[]>>(
                    queries[entity](cursor[entity] as Cursor)
                );
                return { entity, rows: (data[entity] ?? []) as any[] };
            })
        );

        const rowsMap = new Map<CursorDbEntity, any[]>();
        dataByEntity.forEach(({ entity, rows }) => {
            rowsMap.set(entity as CursorDbEntity, rows);
        });

        const graduatedRows = rowsMap.get("tokenGraduateds") ?? [];
        if (graduatedRows.length > 0) {
            await handlers.tokenGraduateds(graduatedRows);
        }

        const buyRows = rowsMap.get("tokenBoughts") ?? [];
        const sellRows = rowsMap.get("tokenSolds") ?? [];
        if (buyRows.length > 0 || sellRows.length > 0) {
            await handleTrades(buyRows, sellRows);
        }

        for (const entity of entityNames) {
            const rows = rowsMap.get(entity as CursorDbEntity) ?? [];
            if (rows.length === 0) continue;
            const last = rows[rows.length - 1];
            const lastTimestamp = BigInt(last.blockTimestamp ?? 0);
            const lastId = parseSubgraphId(last.id);
            cursor[entity as CursorDbEntity] = { lastTimestamp, lastId };
        }
    } catch (err) {
        console.error("[SubgraphPoller] poll error:", err);
    } finally {
        pollInProgress = false;
    }
}




// fetching the timestamp from which indexing should start , instead of starting from the epoch everytime

async function fetchCursors(){
    const tmstpms = await prisma.blockTimeStamps.findUnique({ where: { id: "singleton" } });
    if(!tmstpms)return;
    cursor.tokenGraduateds = {
        lastTimestamp: BigInt(tmstpms.tokenGraduatedsTimestamp ?? 0),
        lastId: BigInt(tmstpms.tokenGraduatedsLastId ?? 0),
    };
    cursor.tokenBoughts = {
        lastTimestamp: BigInt(tmstpms.tokenBoughtsTimestamp ?? 0),
        lastId: BigInt(tmstpms.tokenBoughtsLastId ?? 0),
    };
    cursor.tokenSolds = {
        lastTimestamp: BigInt(tmstpms.tokenSoldsTimestamp ?? 0),
        lastId: BigInt(tmstpms.tokenSoldsLastId ?? 0),
    };
}





export async function startSubgraphPoller(manager: TokenRPC) {
    tokenManager = manager;
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





