import type { CreatedStatus } from "../enums/CreatedStatus";

export type JournalResponse = {
    journalId: number;
    title: string;
    text: string;
    storylineId: number;
    appUserId: number;
    locationId: number;
    createdAt: string;
    createdStatus: CreatedStatus;
}