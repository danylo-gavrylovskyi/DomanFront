import { Order, PaginationOrders } from "../types/order.interface";
import { Pagination } from "@/types/pagination.interface";
import { ApiRoutes } from "@/types/api-routes.enum";

import customAxios from "@/utils/axios";

export const OrdersService = {
	async placeOrder(data: Order): Promise<Order> {
		const { data: response } = await customAxios.post(ApiRoutes.Orders, data);
		return response;
	},

	async getAllWithPagination(queryParams?: Pagination): Promise<PaginationOrders> {
		const { data } = await customAxios({
			url: ApiRoutes.Orders,
			method: "GET",
			params: queryParams,
		});
		return data;
	},
};
