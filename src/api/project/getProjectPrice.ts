import {API_URL} from "@/utils/constants.ts";
import axios from "axios";

export interface GetProjectPriceRequest {
    projectId: string;
}

export interface GetProjectPriceResponse {
    projectId?: string;
    price?: number;
    timestamp?: number;
}

export const getProjectPrice = async (
    request: GetProjectPriceRequest
): Promise<GetProjectPriceResponse> => {
    try {
        const response = await axios.get<GetProjectPriceResponse>(
            `${API_URL}/api/project/price`,
            {params: request}
        );
        return response.data;
    } catch (error) {
        console.error("Failed to fetch project price", error);
        throw new Error("Error fetching project price");
    }
};
