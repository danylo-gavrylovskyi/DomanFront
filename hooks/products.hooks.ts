import { useMutation, useQuery } from "@tanstack/react-query";

import { ProductsService } from "@/services/products.service";

import { queryClient } from "@/components/LayoutProvider";

import {
	ADD_PRODUCT_KEY,
	DELETE_PRODUCT_KEY,
	EDIT_PRODUCT_KEY,
	GET_PRODUCTS_KEY,
} from "@/types/constants/react-query-keys.constants";
import { Update } from "@reduxjs/toolkit";
import { UpdateProduct } from "@/types/update-product.interface";
import { CreateProduct } from "@/types/product.interface";

export const useGetProducts = () => {
	return useQuery([GET_PRODUCTS_KEY], () => ProductsService.getAll());
};

export const useAddProduct = () => {
	const { mutate } = useMutation(
		[ADD_PRODUCT_KEY],
		(productData: FormData) => ProductsService.add(productData),
		{
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS_KEY] });
			},
		}
	);
	return mutate;
};

export const useEditProduct = () => {
	const { mutate } = useMutation(
		[EDIT_PRODUCT_KEY],
		({ productId, editData }: { productId: number; editData: UpdateProduct }) =>
			ProductsService.edit(productId, editData),
		{
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS_KEY] });
			},
		}
	);
	return mutate;
};

export const useDeleteProduct = () => {
	const { mutate } = useMutation(
		[DELETE_PRODUCT_KEY],
		(productId: number) => ProductsService.delete(productId),
		{
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS_KEY] });
			},
		}
	);
	return mutate;
};
