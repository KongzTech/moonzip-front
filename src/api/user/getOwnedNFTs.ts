import axios from "axios";
import {API_URL} from "@/utils/constants.ts";

export interface GetOwnedNFTsRequest {
    ownerAddress: string;
    page: number;
    limit: number;
}

export interface GetOwnedNFTsResponse {
    jsonrpc?: string;
    result?: GetOwnedNFTsResponseDetail;
    id?: string;
}

export interface GetOwnedNFTsResponseDetail {
    total: number;
    limit: number;
    page: number;
    items: NFTItem[];
}

export interface NFTItem {
    interface?: string;
    id?: string;
    content: NFTContent;
    authorities: Authority[];
    compression: Compression;
    grouping: Grouping[];
    royalty: Royalty;
    creators: Creator[];
    ownership: Ownership;
    supply: Supply;
    mutable?: boolean;
    burnt?: boolean;
}

export interface NFTContent {
    jsonUri?: string;
    files: NFTFile[];
    metadata: Metadata;
    links: Links;
}

export interface NFTFile {
    uri?: string;
    cdnUri?: string;
    mime?: string;
}

export interface Metadata {
    description?: string;
    name?: string;
    symbol?: string;
    tokenStandard?: string;
    attributes?: Attribute[];
}

export interface Attribute {
    value?: string;
    traitType?: string;
}

export interface Links {
    externalUrl?: string;
    image?: string;
}

export interface Authority {
    address?: string;
    scopes: string[];
}

export interface Compression {
    eligible?: boolean;
    compressed?: boolean;
    dataHash?: string;
    creatorHash?: string;
    assetHash?: string;
    tree?: string;
    seq?: number;
    leafId?: number;
}

export interface Grouping {
    groupKey?: string;
    groupValue?: string;
}

export interface Royalty {
    royaltyModel?: string;
    target?: string;
    percent?: number;
    basisPoints?: number;
    primarySaleHappened?: boolean;
    locked?: boolean;
}

export interface Creator {
    address?: string;
    share?: number;
    verified?: boolean;
}

export interface Ownership {
    frozen: boolean;
    delegated: boolean;
    delegate?: string;
    ownershipModel?: string;
    owner?: string;
}

export interface Supply {
    printMaxSupply?: number;
    printCurrentSupply?: number;
    editionNonce?: number;
}

export const getOwnedNFTs = async (
    request: GetOwnedNFTsRequest
): Promise<GetOwnedNFTsResponse> => {
    return await axios
        .get<GetOwnedNFTsResponse>(`${API_URL}/api/user/owned-nfts?ownerAddress=${request.ownerAddress}
            &page=${request.page}&limit=${request.limit}`)
        .then((res) => res.data);
};
