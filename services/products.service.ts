import { ApiRoutes } from "@/types/api-routes.enum";
import { Pagination } from "@/types/pagination.interface";
import { PaginationProducts, Product } from "@/types/product.interface";

import customAxios from "@/utils/axios";

export const ProductsService = {
	async getAllWithPagination(queryParams?: Pagination): Promise<PaginationProducts> {
		const { data } = await customAxios({
			url: ApiRoutes.Products,
			method: "GET",
			params: queryParams,
		});
		return data;
	},

	async getAll(): Promise<Product[]> {
		const { data } = await customAxios.get(`${ApiRoutes.Products}/admin`);
		return data;
	},

	async add(productData: FormData): Promise<Product> {
		const { data } = await customAxios.post(ApiRoutes.Products, productData);
		return data;
	},

	async delete(productId: number): Promise<number> {
		const { data } = await customAxios.delete(`${ApiRoutes.Products}/${productId}`);
		return data;
	},

	async edit(productId: number, formData: FormData): Promise<Product> {
		const { data } = await customAxios.patch(`${ApiRoutes.Products}/${productId}`, formData);
		return data;
	},
};
