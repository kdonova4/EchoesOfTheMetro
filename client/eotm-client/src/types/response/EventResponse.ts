import type { EventType } from "../enums/EventType";
import type { BadgeResponse } from "./BadgeResponse";

export type EventResponse = {
    eventId: number;
    text: string;
    eventType: EventType;
    scrapFound: number;
    fuelFound: number;
    mgrCollected: number;
    locationId: number;
    badge: BadgeResponse | null;
    soundPath: string;
    mediaPath: string;
}