import axios from "axios";
import {API_URL} from "@/utils/constants.ts";

export interface UserInfoResponse {
    walletAddress: string;
    username: string;
    displayName: string;
    imageUrl: string;
    lastActiveDate: number;
    createdAt: string;
    updatedAt: string;
}

export const getUserInfo = async (
    userAddress: string
): Promise<UserInfoResponse> => {
    return await axios
        .get<UserInfoResponse>(`${API_URL}/api/user/get?walletAddress=${userAddress}`)
        .then((res) => res.data);
};
