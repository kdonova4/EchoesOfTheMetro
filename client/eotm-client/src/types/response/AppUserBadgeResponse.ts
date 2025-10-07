import type { BadgeResponse } from "./BadgeResponse";

export type AppUserBadgeResponse = {
    appUserId: number;
    badge: BadgeResponse;
    dateEarned: string;
}