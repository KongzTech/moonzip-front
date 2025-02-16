import axios from "axios";
import {API_URL} from "@/utils/constants.ts";

export interface BuyRequest {
    user: string;
    projectId: string;
    sols: number;
    minTokenOutput?: number;
}

export interface BuyResponse {
    success: boolean;
    transaction: string;
}

export const buyProject = async (
    request: BuyRequest
): Promise<BuyResponse> => {
    try {
        const response = await axios.post<BuyResponse>(
            `${API_URL}/api/project/buy`,
            request
        );
        return response.data;
    } catch (error) {
        console.error("Failed to buy project tokens", error);
        throw new Error("Error buying tokens");
    }
};
