import { Category } from "@/types/category.interface";
import { ApiRoutes } from "@/types/api-routes.enum";

import customAxios from "@/utils/axios";

export const CategoriesService = {
	async getAll(): Promise<Category[]> {
		const { data } = await customAxios.get(ApiRoutes.Categories);
		return data;
	},

	async add(formData: FormData): Promise<Category> {
		const { data } = await customAxios.post(ApiRoutes.Categories, formData);
		return data;
	},

	async delete(categoryId: number): Promise<number> {
		const { data } = await customAxios.delete(`${ApiRoutes.Categories}/${categoryId}`);
		return data;
	},

	async edit(editData: { id: number; formData: FormData }): Promise<Category> {
		const { data } = await customAxios.patch(
			`${ApiRoutes.Categories}/${editData.id}`,
			editData.formData
		);
		return data;
	},
};
