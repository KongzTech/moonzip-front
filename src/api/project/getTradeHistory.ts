import {API_URL} from "@/utils/constants.ts";
import axios from "axios";

export interface GetProjectTradeRequest {
    projectId: string;
    page?: number;
    limit?: number;
}

export interface ProjectTransaction {
    transactionId?: string;
    timestamp: number;
    event: string;
    solAmount: number;
    tokenAmount: number;
}

export interface GetProjectTradesResponse {
    projectId: string;
    total: number;
    page: number;
    limit: number;
    trades: ProjectTransaction[];
}

export const getProjectTrades = async (
    request: GetProjectTradeRequest
): Promise<GetProjectTradesResponse> => {
    try {
        const response = await axios.get<GetProjectTradesResponse>(
            `${API_URL}/api/project/trades`,
            {params: request}
        );
        return response.data;
    } catch (error) {
        console.error("Failed to fetch project trades", error);
        throw new Error("Error fetching project trades");
    }
};
