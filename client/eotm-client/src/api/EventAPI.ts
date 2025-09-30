import axios from "axios";
import type { EventResponse } from "../types/response/EventJournal";
import { getAxiosConfig } from "./axiosConfig";

const url = `${import.meta.env.VITE_API_URL}/api/events`;

export const findByEventId = async (eventId: number): Promise<EventResponse> => {
    const response = await axios.get(`${url}/${eventId}`, getAxiosConfig());

    return response.data;
}

export const generateEvent = async (locationId: number, userId: number): Promise<EventResponse> => {
    const response = await axios.get(`${url}/event/${locationId}/${userId}`, getAxiosConfig())

    return response.data;
}