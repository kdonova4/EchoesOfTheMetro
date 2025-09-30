import axios from "axios";
import type { BadgeResponse } from "../types/response/BadgeResponse";
import { getAxiosConfig } from "./axiosConfig";

const url = `${import.meta.env.VITE_API_URL}/api/badges`;

export const findByBadgeId = async (badgeId: number): Promise<BadgeResponse> => {
    const response = await axios.get(`${url}/${badgeId}`, getAxiosConfig());

    return response.data;
}