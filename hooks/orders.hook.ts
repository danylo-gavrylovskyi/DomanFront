import { useQuery } from "@tanstack/react-query";

import { OrdersService } from "@/services/orders.service";

import { GET_ORDERS_WITH_PAGINATION_KEY } from "@/types/constants/react-query-keys.constants";
import { Pagination } from "@/types/pagination.interface";

export const useGetOrdersWithPagination = (queryParams?: Pagination) => {
	return useQuery([GET_ORDERS_WITH_PAGINATION_KEY, queryParams], () =>
		OrdersService.getAllWithPagination(queryParams)
	);
};
