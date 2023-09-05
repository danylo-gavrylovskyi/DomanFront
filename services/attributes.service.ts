import { ApiRoutes } from "@/types/api-routes.enum";
import { Attribute } from "@/types/attribute.interface";

import customAxios from "@/utils/axios";

export const AttributesService = {
	async getAll(): Promise<Attribute[]> {
		const { data } = await customAxios.get(ApiRoutes.Attributes);
		return data;
	},

	async add(title: string): Promise<Attribute> {
		const { data } = await customAxios.post(ApiRoutes.Attributes, { title });
		return data;
	},

	async delete(id: number): Promise<number> {
		const { data } = await customAxios.delete(`${ApiRoutes.Attributes}/${id}`);
		return data;
	},
};
