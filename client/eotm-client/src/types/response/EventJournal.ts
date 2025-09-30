import type { EventType } from "../enums/EventType";

export type EventResponse = {
    eventId: number;
    text: string;
    eventType: EventType;
    scrapFound: number;
    fuelFound: number;
    mgrCollected: number;
    locationId: number;
    badgeId: number;
    soundPath: string;
    mediaPath: string;
}