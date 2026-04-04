import { prisma } from "@repo/database/client";
import { broadcast } from "../wsLayer/transactions.js";
import { EventType, TransactionEvents } from "../share/enums.js";
import { normalizeAddress } from "../utility/normalizeAddress.js";

const SUBGRAPH_URL = process.env.SUBGRAPH_URL as string;
const SUBGRAPH_HEADER = `Bearer ${process.env.SUBGRAPH_API_KEY}`;
const POLL_INTERVAL_MS = 2_000;
const SAVE_INTERVAL = 20_000;
const PAGE_SIZE = 100;

const CURSOR_DB_ENTITIES = [
    "tokenCreateds",
    "tokenDeployeds",
    "tokenGraduateds",
    "tokenBoughts",
    "tokenSolds",
    "poolcreateds",
] as const;

type CursorDbEntity = (typeof CURSOR_DB_ENTITIES)[number];

interface Cursor {
    lastTimestamp: bigint;
    lastId: bigint;
}

const cursor: Record<CursorDbEntity, Cursor> = {
    tokenCreateds: { lastTimestamp: 0n, lastId: 0n },
    tokenDeployeds: { lastTimestamp: 0n, lastId: 0n },
    tokenGraduateds: { lastTimestamp: 0n, lastId: 0n },
    tokenBoughts: { lastTimestamp: 0n, lastId: 0n },
    tokenSolds: { lastTimestamp: 0n, lastId: 0n },
    poolcreateds: { lastTimestamp: 0n, lastId: 0n },
};

let pollInProgress = false;
let lastSaveAt = 0;
let previousCursorSnapshot: Record<CursorDbEntity, Cursor> = getCursorSnapshot();

async function gql<T>(query: string): Promise<T> {
    const res = await fetch(SUBGRAPH_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: SUBGRAPH_HEADER,
        },
        body: JSON.stringify({ query }),
    });

    if (!res.ok) throw new Error(`Subgraph HTTP ${res.status}`);

    const json = (await res.json()) as { data: T; errors?: { message: string }[] };
    if (json.errors?.length) {
        throw new Error(json.errors.map((error) => error.message).join(", "));
    }

    return json.data;
}

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

function parseCursorBigInt(value: string | number | bigint | null | undefined): bigint {
    if (value === undefined || value === null) return 0n;
    try {
        return BigInt(value);
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
    if (c.lastId <= 0n) {
        return `blockTimestamp_gt: "${c.lastTimestamp.toString()}"`;
    }
    return `blockTimestamp_gte: "${c.lastTimestamp.toString()}", id_gt: "${formatSubgraphId(c.lastId)}"`;
}

const queries = {
    tokenCreateds: (c: Cursor) => `{
        tokenCreateds(
            where: { ${whereClause(c)} }
            orderBy: blockTimestamp
            orderDirection: asc
            first: ${PAGE_SIZE}
        ) { id token poolTokens poolVETHs blockNumber blockTimestamp transactionHash }
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

    poolcreateds: (c: Cursor) => `{
        poolcreateds(
            where: { ${whereClause(c)} }
            orderBy: blockTimestamp
            orderDirection: asc
            first: ${PAGE_SIZE}
        ) { id tokenA poolAmount poolVETHs blockNumber blockTimestamp transactionHash }
    }`,
};

function sortRowsByTimestampId(rows: any[]) {
    rows.sort((a, b) => {
        const tsA = parseCursorBigInt(a.blockTimestamp);
        const tsB = parseCursorBigInt(b.blockTimestamp);
        if (tsA < tsB) return -1;
        if (tsA > tsB) return 1;

        const idA = parseSubgraphId(a.id);
        const idB = parseSubgraphId(b.id);
        if (idA < idB) return -1;
        if (idA > idB) return 1;
        return 0;
    });
}

function updateCursorFromRows(entity: CursorDbEntity, rows: any[]) {
    if (rows.length === 0) return;

    const last = rows[rows.length - 1];
    const lastTimestamp = parseCursorBigInt(last.blockTimestamp);
    const lastId = parseSubgraphId(last.id);

    if (rows.length === PAGE_SIZE) {
        cursor[entity] = { lastTimestamp, lastId };
    } else {
        cursor[entity] = { lastTimestamp, lastId: 0n };
    }
}

async function handleTokenCreateds(rows: any[]) {
    for (const row of rows) {
        const coin = await prisma.coin.findFirst({ where: { id: row.internal_id } });
        if (!coin) {
            console.log(JSON.stringify({ event: "TokenCreated", status: "coin_not_found", id: row.internal_id }));
            continue;
        }

        await prisma.coin.update({
            where: { id: row.internal_id },
            data: { address: row.token },
        });

        broadcast(EventType.tokenCreated, row);
        console.log(JSON.stringify({ event: "TokenCreated", id: row.internal_id, address: row.token, poolTokens: row.poolTokens, poolVETHs:  row.poolVETHs }));
    }
}

async function handleTokenDeployeds(rows: any[]) {
    for (const row of rows) {
        console.log(JSON.stringify({ event: "tokenDeployed", token: row.token, block: row.blockNumber }));
    }
}

async function handleTokenGraduateds(rows: any[]) {
    for (const row of rows) {
        const updated = await prisma.coin.updateMany({
            where: { address: row.token.toLowerCase() },
            data: { graduated: true },
        });

        broadcast(EventType.tokenGraduated, row);
        console.log(
            JSON.stringify({
                event: "tokenGraduated",
                token: row.token,
                updated: updated.count,
                block: row.blockNumber,
            })
        );
    }
}

async function handlePoolcreateds(rows: any[]) {
    for (const row of rows) {
        console.log(
            JSON.stringify({
                event: "poolcreated",
                tokenA: row.tokenA,
                poolAmount: row.poolAmount,
                poolVETHs: row.poolVETHs,
                block: row.blockNumber,
            })
        );
    }
}

const nonTradeHandlers: Record<Exclude<CursorDbEntity, "tokenBoughts" | "tokenSolds">, (rows: any[]) => Promise<void>> = {
    tokenCreateds: handleTokenCreateds,
    tokenDeployeds: handleTokenDeployeds,
    tokenGraduateds: handleTokenGraduateds,
    poolcreateds: handlePoolcreateds,
};

async function pollNonTradeEntities() {
    const entities: Exclude<CursorDbEntity, "tokenBoughts" | "tokenSolds">[] = [
        "tokenCreateds",
        "tokenDeployeds",
        "tokenGraduateds",
        "poolcreateds",
    ];

    await Promise.all(
        entities.map(async (entity) => {
            const data = await gql<Record<string, any[]>>(queries[entity](cursor[entity]));
            const rows = data[entity] ?? [];
            if (rows.length === 0) return;

            sortRowsByTimestampId(rows);
            await nonTradeHandlers[entity](rows);
            updateCursorFromRows(entity, rows);
        })
    );
}

async function pollTradeEntities() {
    const buyData = await gql<Record<string, any[]>>(queries.tokenBoughts(cursor.tokenBoughts));
    const sellData = await gql<Record<string, any[]>>(queries.tokenSolds(cursor.tokenSolds));

    const buyRows = buyData.tokenBoughts ?? [];
    const sellRows = sellData.tokenSolds ?? [];

    if (buyRows.length === 0 && sellRows.length === 0) return;

    const merged = [
        ...buyRows.map((row) => ({
            ...row,
            _kind: "buy" as const,
            _timestamp: parseCursorBigInt(row.blockTimestamp ?? row.blockNumber ?? 0),
            _id: parseSubgraphId(row.id),
        })),
        ...sellRows.map((row) => ({
            ...row,
            _kind: "sell" as const,
            _timestamp: parseCursorBigInt(row.blockTimestamp ?? row.blockNumber ?? 0),
            _id: parseSubgraphId(row.id),
        })),
    ];

    merged.sort((a, b) => {
        if (a._kind !== b._kind) return a._kind === "buy" ? -1 : 1;
        if (a._timestamp < b._timestamp) return -1;
        if (a._timestamp > b._timestamp) return 1;
        if (a._id < b._id) return -1;
        if (a._id > b._id) return 1;
        return 0;
    });

    for (const row of merged) {
        if (row._kind === "buy") {
            broadcast(TransactionEvents.tokenBought, row);
            await updateHoldingInfo(
                row.sender ?? row.buyer,
                row.token,
                BigInt(row.amount),
                "buy",
                row._timestamp,
                row._id
            );
        } else {
            broadcast(TransactionEvents.tokenSold, row);
            await updateHoldingInfo(
                row.sender ?? row.seller,
                row.token,
                BigInt(row.amount),
                "sell",
                row._timestamp,
                row._id
            );
        }
    }

    sortRowsByTimestampId(buyRows);
    sortRowsByTimestampId(sellRows);
    updateCursorFromRows("tokenBoughts", buyRows);
    updateCursorFromRows("tokenSolds", sellRows);
}

async function pollOnce() {
    if (pollInProgress) return;
    pollInProgress = true;

    try {
        await pollNonTradeEntities();
        await pollTradeEntities();
    } catch (error) {
        console.error("[SubgraphPoller] poll error:", error);
    } finally {
        pollInProgress = false;
    }
}

function getCursorSnapshot(): Record<CursorDbEntity, Cursor> {
    return Object.fromEntries(
        CURSOR_DB_ENTITIES.map((entity) => [entity, { ...cursor[entity] }])
    ) as Record<CursorDbEntity, Cursor>;
}

function hasCursorChanged(
    current: Record<CursorDbEntity, Cursor>,
    previous: Record<CursorDbEntity, Cursor>
): boolean {
    for (const key of CURSOR_DB_ENTITIES) {
        if (
            current[key].lastTimestamp !== previous[key].lastTimestamp ||
            current[key].lastId !== previous[key].lastId
        ) {
            return true;
        }
    }
    return false;
}

async function saveCursorIfNeeded() {
    const current = getCursorSnapshot();
    if (!hasCursorChanged(current, previousCursorSnapshot)) return;

    const data = {
        tokenDeployedsTimestamp: current.tokenDeployeds.lastTimestamp.toString(),
        tokenDeployedsLastId: current.tokenDeployeds.lastId.toString(),
        tokenGraduatedsTimestamp: current.tokenGraduateds.lastTimestamp.toString(),
        tokenGraduatedsLastId: current.tokenGraduateds.lastId.toString(),
        tokenBoughtsTimestamp: current.tokenBoughts.lastTimestamp.toString(),
        tokenBoughtsLastId: current.tokenBoughts.lastId.toString(),
        tokenSoldsTimestamp: current.tokenSolds.lastTimestamp.toString(),
        tokenSoldsLastId: current.tokenSolds.lastId.toString(),
        poolcreatedsTimestamp: current.poolcreateds.lastTimestamp.toString(),
        poolcreatedsLastId: current.poolcreateds.lastId.toString(),
        tokencreatedsTimestamp: current.tokenCreateds.lastTimestamp.toString(),
        tokencreatedLastId: current.tokenCreateds.lastId.toString(),
    };

    await prisma.blockTimeStamps.upsert({
        where: { id: "singleton" },
        update: data as any,
        create: { id: "singleton", ...data } as any,
    });

    previousCursorSnapshot = current;
}

async function fetchCursors() {
    const persisted = await prisma.blockTimeStamps.findUnique({ where: { id: "singleton" } });
    if (!persisted) return;

    cursor.tokenCreateds = {
        lastTimestamp: parseCursorBigInt(persisted.tokencreatedsTimestamp),
        lastId: parseCursorBigInt(persisted.tokencreatedLastId),
    };
    cursor.tokenDeployeds = {
        lastTimestamp: parseCursorBigInt(persisted.tokenDeployedsTimestamp),
        lastId: parseCursorBigInt(persisted.tokenDeployedsLastId),
    };
    cursor.tokenGraduateds = {
        lastTimestamp: parseCursorBigInt(persisted.tokenGraduatedsTimestamp),
        lastId: parseCursorBigInt(persisted.tokenGraduatedsLastId),
    };
    cursor.tokenBoughts = {
        lastTimestamp: parseCursorBigInt(persisted.tokenBoughtsTimestamp),
        lastId: parseCursorBigInt(persisted.tokenBoughtsLastId),
    };
    cursor.tokenSolds = {
        lastTimestamp: parseCursorBigInt(persisted.tokenSoldsTimestamp),
        lastId: parseCursorBigInt(persisted.tokenSoldsLastId),
    };
    cursor.poolcreateds = {
        lastTimestamp: parseCursorBigInt(persisted.poolcreatedsTimestamp),
        lastId: parseCursorBigInt(persisted.poolcreatedsLastId),
    };

    previousCursorSnapshot = getCursorSnapshot();
}

async function updateHoldingInfo(
    userAddress: `0x${string}`,
    tokenAddress: `0x${string}`,
    amount: bigint,
    action: "buy" | "sell",
    blockTimestamp: bigint,
    lastId: bigint
) {
    const normalizedTokenAddress = normalizeAddress(tokenAddress);
    const normalizedUserAddress = normalizeAddress(userAddress);

    if (amount <= 0n) return;

    try {
        await prisma.$transaction(async (tx) => {
            await tx.user.upsert({
                where: { publicKey: normalizedUserAddress },
                create: { publicKey: normalizedUserAddress },
                update: {},
            });

            if (action === "buy") {
                await tx.holding.upsert({
                    where: {
                        // @ts-ignore
                        coinAddress_userAddress: {
                            coinAddress: normalizedTokenAddress,
                            userAddress: normalizedUserAddress,
                        },
                    },
                    create: {
                        // @ts-ignore
                        coinAddress: normalizedTokenAddress,
                        userAddress: normalizedUserAddress,
                        amount,
                    },
                    update: {
                        amount: {
                            increment: amount,
                        },
                    },
                });
            } else {
                await tx.$executeRaw`
                    UPDATE "holding"
                    SET "amount" = GREATEST("amount" - ${amount}, 0)
                    WHERE "coinAddress" = ${normalizedTokenAddress}
                      AND "userAddress" = ${normalizedUserAddress}
                `;

                await tx.$executeRaw`
                    UPDATE "holding"
                    SET "amount" = 0
                    WHERE "coinAddress" = ${normalizedTokenAddress}
                      AND "userAddress" = ${normalizedUserAddress}
                      AND "amount" < 0
                `;
            }

            await tx.blockTimeStamps.upsert({
                where: { id: "singleton" },
                update:
                    action === "buy"
                        ? {
                              tokenBoughtsTimestamp: blockTimestamp.toString(),
                              tokenBoughtsLastId: lastId.toString(),
                          }
                        : {
                              tokenSoldsTimestamp: blockTimestamp.toString(),
                              tokenSoldsLastId: lastId.toString(),
                          } as any,
                create:
                    action === "buy"
                        ? {
                              id: "singleton",
                              tokenBoughtsTimestamp: blockTimestamp.toString(),
                              tokenBoughtsLastId: lastId.toString(),
                          }
                        : {
                              id: "singleton",
                              tokenSoldsTimestamp: blockTimestamp.toString(),
                              tokenSoldsLastId: lastId.toString(),
                          } as any,
            });
        });
    } catch (error) {
        console.log("[Subgraph Poller] Token updation failed");
        console.log("[Holding Info updation Error] ", error);
        throw error;
    }
}

export async function startSubgraphPoller() {
    if (!SUBGRAPH_URL) {
        console.error("[SubgraphPoller] SUBGRAPH_URL not set — poller disabled");
        return;
    }

    await fetchCursors();
    console.log(`[SubgraphPoller] starting — polling every ${POLL_INTERVAL_MS}ms`);

    const tick = async () => {
        await pollOnce();

        const now = Date.now();
        if (now - lastSaveAt >= SAVE_INTERVAL) {
            try {
                await saveCursorIfNeeded();
                lastSaveAt = now;
            } catch (error) {
                console.error("[SubgraphPoller] save cursor error:", error);
            }
        }
    };

    await tick();
    setInterval(() => {
        tick().catch((error) => console.error("[SubgraphPoller] interval loop error:", error));
    }, POLL_INTERVAL_MS);
}
