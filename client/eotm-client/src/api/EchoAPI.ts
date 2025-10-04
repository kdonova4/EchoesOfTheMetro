import axios from "axios";
import { getAxiosConfig } from "./axiosConfig";
import type { EchoCreateRequest } from "../types/create/EchoCreateRequest";
import type { EchoResponse } from "../types/response/EchoResponse";

const url = `${import.meta.env.VITE_API_URL}/api/echoes`;

export const countByJournal = async (journalId: number): Promise<number> => {

    const response = await axios.get(`${url}/journal/${journalId}`, getAxiosConfig());

    return response.data;
}

export const createEcho = async (echo: EchoCreateRequest): Promise<EchoResponse> => {
    const response = await axios.post(`${url}`, echo, getAxiosConfig());

    return response.data;
}

export const deleteEcho = async(echoId: number): Promise<void> => {
    const response = await axios.delete(`${url}/${echoId}`, getAxiosConfig());
    if (response.status !== 204) {
        throw new Error(`Unexpected status: ${response.status}`);
    }
}

export const findEchoForJournalAndUser = async(journalId: number, userId: number): Promise<EchoResponse | null> => {
    const response = await axios.get(`${url}/journal/${journalId}/user/${userId}`, getAxiosConfig());

    if(response.status !== 200) {
        return null;
    }
    
    return response.data;
}

export const findEchoById = async (echoId: number): Promise<EchoResponse> => {
    const response = await axios.get(`${url}/${echoId}`, getAxiosConfig());

    return response.data;
}