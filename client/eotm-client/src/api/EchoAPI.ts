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