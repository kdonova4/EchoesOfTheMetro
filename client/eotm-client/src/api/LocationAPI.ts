import type { LocationResponse } from "../types/response/LocationResponse";
import axios from "axios";
import { getAxiosConfig } from "./axiosConfig";

export const fetchAllLocations = async (): Promise<LocationResponse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/locations`, getAxiosConfig())

    return response.data;
}

export const fetchLocationById = async (locationId: number): Promise<LocationResponse> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/locations/${locationId}`, getAxiosConfig())

    return response.data;
}