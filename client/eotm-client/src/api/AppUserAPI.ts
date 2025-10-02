import axios, { type AxiosResponse } from "axios";
import type { AppUserResponse } from "../types/response/AppUserResponse";
import { getAxiosConfig } from "./axiosConfig";
import type { Credentials } from "../types/login/Credentials";
import type { AppUserCreateRequest } from "../types/create/AppUserCreateRequest";
import type { RegisterResponse } from "../types/response/RegisterResponse";

const url = `${import.meta.env.VITE_API_URL}/api/users`;

export const findByUserId = async (userId: number): Promise<AppUserResponse> => {
    const response = await axios.get(`${url}/${userId}`, getAxiosConfig());

    return response.data;
}

export const findMe = async (): Promise<AppUserResponse> => {
    const response = await axios.get(`${url}/me`, getAxiosConfig());

    return response.data;
}

export const login = async (credentials: Credentials): Promise<AxiosResponse<void>> => {
    const response = await axios.post(`${url}/login`, credentials);

    return response;
}

export const register = async (credentials: AppUserCreateRequest): Promise<RegisterResponse> => {
    try {
        const response = await axios.post(`${url}/register`, credentials);
        return response.data;
    } catch (error: any) {
        // Grab backend error message(s)
        if (error.response && error.response.data) {
            throw error.response.data; // your backend sends ["Username is REQUIRED"] etc.
        }

        // Fallback if nothing useful is in response
        throw new Error("Registration failed");
    }
}