import { createClient } from "redis";
import { updateCoinPool } from "./routes/updateCoinPool";

const EVENTS_HASH_KEY = "events";

const READ_INTERVAL_MS = Number(process.env.READ_INTERVAL_MS) || 500;

const client = createClient({
    url: process.env.REDIS_URL ?? "redis://localhost:6379",
});

client.on("error", (error: unknown) => {
    console.error("Redis client error:", error);
});

async function readAndClearEventsHash(): Promise<void> {
    const data = await client.hGetAll(EVENTS_HASH_KEY);

    if (Object.keys(data).length === 0) {
        return;
    }
    const parsed = JSON.parse(data);
    await updateCoinPool(parsed);
    console.log("Read events:", data);

    await client.unlink(EVENTS_HASH_KEY);
}

async function main(): Promise<void> {
    await client.connect();
    console.log("Worker connected to Redis");

    let isRunning = false;

    setInterval(() => {
        if (isRunning) {
            return;
        }

        isRunning = true;
        void readAndClearEventsHash().finally(() => {
            isRunning = false;
        });
    }, READ_INTERVAL_MS);

    const shutdown = async () => {
        await client.quit();
        process.exit(0);
    };

    process.on("SIGINT", () => {
        void shutdown();
    });

    process.on("SIGTERM", () => {
        void shutdown();
    });
}

void main();