import { Order } from "./order.interface";
import { ApiRoutes } from "@/types/api-routes.enum";

import customAxios from "@/utils/axios";

export const OrdersService = {
	async placeOrder(data: Order): Promise<Order> {
		const { data: response } = await customAxios.post(ApiRoutes.Orders, data);
		return response;
	},
};
