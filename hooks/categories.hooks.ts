import { useMutation, useQuery } from "@tanstack/react-query";

import { CategoriesService } from "@/services/categories.service";

import {
	ADD_CATEGORY_KEY,
	DELETE_CATEGORY_KEY,
	EDIT_CATEGORY_KEY,
	GET_CATEGORIES_KEY,
} from "@/types/constants/react-query-keys.constants";

import { queryClient } from "@/components/LayoutProvider";

export const useGetCategories = () => {
	return useQuery([GET_CATEGORIES_KEY], () => CategoriesService.getAll());
};

export const useAddCategory = () => {
	return useMutation([ADD_CATEGORY_KEY], (formData: FormData) => CategoriesService.add(formData), {
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_KEY] });
		},
	});
};

export const useEditCategory = () => {
	return useMutation(
		[EDIT_CATEGORY_KEY],
		({ id, formData }: { id: number; formData: FormData }) =>
			CategoriesService.edit({ id, formData }),
		{
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_KEY] });
			},
		}
	);
};

export const useDeleteCategory = () => {
	return useMutation(
		[DELETE_CATEGORY_KEY],
		(categoryId: number) => CategoriesService.delete(categoryId),
		{
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_KEY] });
			},
		}
	);
};
