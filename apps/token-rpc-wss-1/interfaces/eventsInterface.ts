import { EventType } from "@repo/wss-utilities/enums";
import { TransactionEvents } from "../share/enum";

const E = { ...EventType, ...TransactionEvents };
export type EventTypes = keyof typeof E;