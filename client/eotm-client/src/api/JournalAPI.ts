import axios from "axios";
import type { JournalResponse } from "../types/response/JournalResponse";
import { getAxiosConfig } from "./axiosConfig";
import type { JournalCreateRequest } from "../types/create/JournalCreateRequest";

const url = `${import.meta.env.VITE_API_URL}/api/journals`;

export const findByUser = async (userId: number): Promise<JournalResponse[]> => {

    const response = await axios.get(`${url}/user/${userId}`, getAxiosConfig());

    return response.data;
}

export const findByLocation = async (locationId: number): Promise<JournalResponse[]> => {
    const response = await axios.get(`${url}/location/${locationId}`, getAxiosConfig());

    return response.data;
}

export const findByEchoes = async (minCount: number): Promise<JournalResponse[]> => {
    const response = await axios.get(`${url}/echoes/${minCount}`, getAxiosConfig());

    return response.data;
}

export const createJournal = async (journal: JournalCreateRequest): Promise<JournalResponse> => {

    try {
        const response = await axios.post(`${url}`, journal, getAxiosConfig());
        return response.data;
    } catch (error: any) {
        // Grab backend error message(s)
        if (error.response && error.response.data) {
            throw error.response.data; // your backend sends ["Username is REQUIRED"] etc.
        }

        // Fallback if nothing useful is in response
        throw new Error("Journal Creation failed");
    }



}