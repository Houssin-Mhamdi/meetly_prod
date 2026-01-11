import { api } from "@/lib/http/axios";

export interface Category {
    _id: string;
    name: string;
    description: string;
    color: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCategoryData {
    name: string;
    description: string;
    color: string;
}

export const createCategory = async (data: CreateCategoryData): Promise<Category> => {
    const response = await api.post("/category", data);
    return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get("/category");
    return response.data;
};

export const updateCategory = async (id: string, data: Partial<CreateCategoryData>): Promise<Category> => {
    const response = await api.put(`/category/${id}`, data);
    return response.data;
};

export const deleteCategory = async (id: string): Promise<Category> => {
    const response = await api.delete(`/category/${id}`);
    return response.data;
};
