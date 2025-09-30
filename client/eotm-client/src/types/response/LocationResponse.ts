import type { LocatonType } from "../enums/LocationType";


export type LocationResponse = {
    locationId: number;
    locationName: string;
    description: string;
    locationType: LocatonType;
}