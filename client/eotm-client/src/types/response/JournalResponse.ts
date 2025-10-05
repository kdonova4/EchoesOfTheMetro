import type { CreatedStatus } from "../enums/CreatedStatus";

export type JournalResponse = {
    journalId: number;
    title: string;
    text: string;
    storylineId: number;
    appUserId: number;
    username: string;
    whispers: number;
    locationId: number;
    createdAt: string;
    createdStatus: CreatedStatus;
}