import { EventType } from "@metamask/sdk";
import { TransactionEvents } from "../share/enum";

const E = { ...EventType, ...TransactionEvents };
export type EventTypes = keyof typeof E;