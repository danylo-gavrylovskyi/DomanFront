import { ApiRoutes } from "@/types/api-routes.enum";

import customAxios from "@/utils/axios";

export const BannersService = {
	async getAll(): Promise<string[]> {
		const { data } = await customAxios.get(ApiRoutes.Banners);
		return data;
	},

	async add(banner: File): Promise<string> {
		const formData: FormData = new FormData();
		formData.append("banner", banner);
		const { data } = await customAxios.post(ApiRoutes.Banners, formData);
		return data;
	},

	async delete(bannerUrl: string): Promise<string> {
		const { data } = await customAxios.delete(`${ApiRoutes.Banners}/${bannerUrl}`);
		return data;
	},
};
