import axios from "axios";
import {API_URL} from "@/utils/constants.ts";
import {useModalStore} from '@/store/modalStore';

export interface UpsertUserProfileResponse {
    walletAddress: string;
    username: string;
    displayName: string;
    imageUrl: string;
    lastActiveDate: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface UpsertUserProfileRequest {
    walletAddress: string;
    username: string;
    displayValue: string;
    nftAddress: string;
}


export const upsertUserInfo = async (
    request: UpsertUserProfileRequest
): Promise<UpsertUserProfileResponse> => {
    return await axios
        .post(`${API_URL}/api/user/upsert`, request, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((res) => res.data.data as UpsertUserProfileResponse);
};

export const handleCreateProfile = async (
    username: string,
    walletAddress: string,
    nftAddress?: string,
    refetchUserInfo?: () => Promise<void>
) => {
    const closeModal = useModalStore.getState().closeModal;

    if (!walletAddress) {
        alert("Wallet address is required!");
        return;
    }

    try {
        const requestData = {
            walletAddress,
            username: username || "",
            displayValue: "",
            nftAddress: nftAddress || '',
        };

        await upsertUserInfo(requestData);
        await refetchUserInfo?.();

        alert("Profile updated successfully!");
        closeModal();
    } catch (error) {
        console.error("Failed to update profile:", error);
        alert("Failed to update profile. Please try again.");
    }
};
