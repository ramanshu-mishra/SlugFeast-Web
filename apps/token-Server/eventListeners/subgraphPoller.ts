import { prisma } from "@repo/database/client";
import { broadcast } from "../wsLayer/transactions.js";
import { EventType } from "../share/enums.js";

const SUBGRAPH_URL = process.env.SUBGRAPH_URL as string;
const SUBGRAPH_HEADER = `Bearer ${process.env.SUBGRAPH_API_KEY}`;
const POLL_INTERVAL_MS = 2_000;
const SAVE_INTERVAL = 20_000; //20 seconds 

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

const prevCursor  = cursor; // used to compare in timeStampSaver whether timeStamp update to db needs to happen or not;

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

function whereClause(c: Cursor): string {
    if (c.lastId === "") return `blockTimestamp_gt: "${c.lastTimestamp}"`;
    return `blockTimestamp_gte: "${c.lastTimestamp}", id_gt: "${c.lastId}"`;
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
        ) { id token VETH amount blockNumber blockTimestamp transactionHash }
    }`,

    tokenSolds: (c: Cursor) => `{
        tokenSolds(
            where: { ${whereClause(c)} }
            orderBy: blockTimestamp
            orderDirection: asc
            first: ${PAGE_SIZE}
        ) { id token VETH amount blockNumber blockTimestamp transactionHash }
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
        broadcast(EventType.TokenCreated, row);
        console.log(JSON.stringify({ event: "TokenCreated", id: row.internal_id, address: row.token }));
    }
}

async function handleTokenDeployeds(rows: any[]) {
    for (const row of rows) {
        broadcast(EventType.tokenDeployed, row);
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
        broadcast(EventType.TokenBought, row);
        console.log(JSON.stringify({
            event: "TokenBought",
            token: row.token,
            VETH: row.VETH,
            amount: row.amount,
            block: row.blockNumber,
            txHash: row.transactionHash,
        }));
    }
}

async function handleTokenSolds(rows: any[]) {
    for (const row of rows) {
        broadcast(EventType.TokenSold, row);
        console.log(JSON.stringify({
            event: "TokenSold",
            token: row.token,
            VETH: row.VETH,
            amount: row.amount,
            block: row.blockNumber,
            txHash: row.transactionHash,
        }));
    }
}

async function handlePoolcreateds(rows: any[]) {
    for (const row of rows) {
        broadcast(EventType.poolcreated, row);
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


// compare two maps

function comapreMaps(mp1: Record<string, Cursor>, mp2 : Record<string,Cursor>){
    for(const [key, value] of Object.entries(mp1)){
        if(mp2[key] != value){
            return false;
        }
    }
    return true;
}


// --- TimeStampSaver

function saveTimeStamp(){
    const prev = cursor;

    async function updateTimeStamps(){

        const updatedTimeStamp = {
             tokenDeployedsTimestamp  :cursor["tokenDeployeds"]?.lastTimestamp as string,
  tokenDeployedsLastId  : cursor["tokenDeployeds"]?.lastId as string,

  tokenGraduatedsTimestamp: cursor["tokenGraduateds"]?.lastTimestamp as string,
  tokenGraduatedsLastId    :cursor["tokenGraduateds"]?.lastId as string,

  tokenBoughtsTimestamp    :cursor["tokenBoughts"]?.lastTimestamp as string,
  tokenBoughtsLastId       :cursor["tokenBoughts"]?.lastId as string,

  tokenSoldsTimestamp      :cursor["tokenSolds"]?.lastTimestamp as string,
  tokenSoldsLastId         :cursor["tokenSolds"]?.lastId as string,

  poolcreatedsTimestamp    :cursor["tokenCreateds"]?.lastTimestamp as string,
  poolcreatedsLastId       :cursor["tokenCreateds"]?.lastId as string
        }

        await prisma.blockTimeStamps.upsert({
            where:{
                id: "singleton"
            },
            update: updateTimeStamps,
            create: updateTimeStamps
        });
    }

    setInterval(async()=>{
        const cmp = comapreMaps(cursor, prev);
        if(!cmp){
            await updateTimeStamps();
        }
    }, SAVE_INTERVAL) // I think this function may lead to some performance issues. lets say update didn't happen and another async request came, then prev request must cancel. I dont know if this is implicitly being handled by nodejs.
}



// ─── Entry point ──────────────────────────────────────────────────────────────
export function startSubgraphPoller() {
    if (!SUBGRAPH_URL) {
        console.error("[SubgraphPoller] SUBGRAPH_URL not set — poller disabled");
        return;
    }

    console.log(`[SubgraphPoller] starting — polling every ${POLL_INTERVAL_MS}ms`);
    poll().catch((e) => console.error("[SubgraphPoller] initial poll error:", e));
    setInterval(() => {
        poll().catch((e) => console.error("[SubgraphPoller] poll error:", e));
        console.log("____yo___fetched_something______");
    }, POLL_INTERVAL_MS);
    saveTimeStamp();
}
