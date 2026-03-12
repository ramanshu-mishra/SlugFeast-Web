"use client";
import { useEffect } from "react";
import { useTokenCreatedSubscription } from "../../../hooks/useTokenCreatedSubscription";

export function NewTokenAlert() {
    const { events, error } = useTokenCreatedSubscription();

    useEffect(() => {
        if (events.length === 0) return;
        const latest = events[0];
        console.log("[TokenCreated] new token address:", latest?.token, "| id:", latest?.internal_id);
    }, [events]);

    if (error) {
        return (
            <p className="text-red-400 text-sm">
                Subscription error: {error.message}
            </p>
        );
    }

    if (events.length === 0) {
        return (
            <p className="text-neutral-500 text-sm">Listening for new tokens...</p>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {events.map((e) => (
                <div key={e.id} className="bg-neutral-800 rounded-md px-4 py-2 text-sm">
                    <span className="text-neutral-400 mr-2">New token:</span>
                    <span className="text-green-400 font-mono">{e.token}</span>
                    <span className="text-neutral-500 ml-2">({e.internal_id})</span>
                </div>
            ))}
        </div>
    );
}
