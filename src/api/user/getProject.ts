import axios from "axios";
import {API_URL} from "@/utils/constants.ts";

export interface GetProjectRequest {
    projectId: string;
}

export interface GetProjectResponseData {
    project?: PublicProjectResponse;
}

export interface GetProjectResponse {
    data: GetProjectResponseData;
}

export interface PublicProjectResponse {
    id: string;
    owner: string;
    name: string;
    description: string;
    createdAt: string;
    stage: PublicProjectStage;
    staticPoolMint?: string;
    curvePoolMint?: string;
    devLockBase?: string;
}

export enum PublicProjectStage {
    StaticPoolActive = "staticPoolActive",
    StaticPoolClosed = "staticPoolClosed",
    CurvePoolActive = "curvePoolActive",
    CurvePoolClosed = "curvePoolClosed",
    Graduated = "graduated"
}

export interface CreateProjectForm {
    request: CreateProjectRequest;
    imageContent: string;
}

export interface CreateProjectRequest {
    owner: string;
    meta: CreateTokenMeta;
    deploySchema: DeploySchema;
}

export interface CreateTokenMeta {
    name: string;
    symbol: string;
    description: string;
    website?: string;
    twitter?: string;
    telegram?: string;
}

export interface DeploySchema {
    staticPool?: StaticPoolSchema;
    curvePool: CurveVariant;
    devPurchase?: DevPurchase;
}

export interface StaticPoolSchema {
    launchPeriod: number; // in seconds
}

export enum CurveVariant {
    Moonzip = "moonzip",
    Pumpfun = "pumpFun",
}

export interface DevPurchase {
    value: number;
    lock: DevLockPeriod;
}

export type DevLockPeriod =
    | { type: "disabled" }
    | { type: "interval"; interval: number };

export const getProject = async (
    request: GetProjectRequest
): Promise<GetProjectResponseData> => {
    return await axios
        .get<GetProjectResponse>(`${API_URL}/api/project/${request.projectId}`)
        .then((res) => res.data.data);
};

