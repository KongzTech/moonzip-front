import {API_URL} from "@/utils/constants.ts";
import axios from "axios";

export interface GetProjectCandlesRequest {
    projectId: string;
    timeRange: string;
    time: number;
}

export interface Candle {
    timestamp?: number;
    open?: number;
    high?: number;
    low?: number;
    close?: number;
}

export interface GetProjectCandlesResponse {
    projectId: string;
    timeRange: string;
    candles: Candle[];
}

export const getProjectCandles = async (
    request: GetProjectCandlesRequest
): Promise<GetProjectCandlesResponse> => {
    try {
        const response = await axios.get<GetProjectCandlesResponse>(
            `${API_URL}/api/project/candles`,
            {params: request}
        );
        return response.data;
    } catch (error) {
        console.error("Failed to fetch project candles", error);
        throw new Error("Error fetching project candles");
    }
};

