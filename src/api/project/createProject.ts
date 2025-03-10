import axios from "axios";
import {API_URL} from "@/utils/constants.ts";
import {CreateProjectForm} from "@/api/project/getProject.ts";

export interface CreateProjectResponse {
    projectId: string;
    transaction: string;
}

export const createProject = async (
    form: CreateProjectForm
): Promise<CreateProjectResponse> => {
    const formData = new FormData();
    formData.append("request", JSON.stringify(form.request));
    formData.append("image_content", form.imageContent);

    return await axios
        .post<CreateProjectResponse>(`${API_URL}/api/project/create`, formData, {
            headers: {"Content-Type": "multipart/form-data"},
        })
        .then((res) => res.data);
};
