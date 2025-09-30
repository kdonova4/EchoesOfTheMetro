import type { AppUserBadgeResponse } from "./AppUserBadgeResponse";

export type AppUserResponse = {
    appUserId: number;
    username: string;
    mgr: number;
    scrap: number;
    fuel: number;
    badgeResponses: AppUserBadgeResponse[];
}