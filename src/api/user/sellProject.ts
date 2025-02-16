import axios from "axios";
import {API_URL} from "@/utils/constants.ts";

export interface SellRequest {
    user: string;
    projectId: string;
    tokens: number;
    minSolOutput?: number;
}

export interface SellResponse {
    success: boolean;
    transaction: string;
}

export const sellProjectTokens = async (
    request: SellRequest
): Promise<SellResponse> => {
    try {
        const response = await axios.post<SellResponse>(
            `${API_URL}/api/project/sell`,
            request
        );
        return response.data;
    } catch (error) {
        console.error("Failed to sell project tokens", error);
        throw new Error("Error selling tokens");
    }
};
