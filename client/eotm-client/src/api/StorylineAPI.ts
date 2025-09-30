import axios from "axios";
import type { StorylineResponse } from "../types/response/StorylineRespose";
import { getAxiosConfig } from "./axiosConfig";
import type { StorylineCreate } from "../types/create/StorylineCreate";

const url = `${import.meta.env.VITE_API_URL}/api/storylines`;

export const findById = async (storylineId: number): Promise<StorylineResponse> => {
    const response = await axios.get(`${url}/${storylineId}`, getAxiosConfig());

    return response.data;
}

export const findByUser = async (userId: number): Promise<StorylineResponse[]> => {
    const response = await axios.get(`${url}/user/${userId}`, getAxiosConfig());

    return response.data;
}

export const createStoryline = async (storyline: StorylineCreate): Promise<StorylineResponse> => {
    const response = await axios.post(`${url}`, storyline, getAxiosConfig());

    return response.data;
}

export const deleteStoryline = async (storylineId: number): Promise<void> => {
    const response = await axios.delete(`${url}/${storylineId}`, getAxiosConfig());

    if (response.status !== 204) {
        throw new Error(`Unexpected status: ${response.status}`);
    }
}