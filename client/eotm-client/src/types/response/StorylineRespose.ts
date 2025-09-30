import type { AppUserResponse } from "./AppUserResponse";

export type StorylineResponse = {
    storylineId: number;
    storylineTitle: string;
    appUser: AppUserResponse[];
}