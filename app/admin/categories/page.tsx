"use client";

import React from "react";

import {
	useAddCategory,
	useDeleteCategory,
	useEditCategory,
	useGetCategories,
} from "@/hooks/categories.hooks";

import { Category } from "@/types/category.interface";

import { AdminCategory } from "@/components/Admin/AdminCategory/AdminCategory";
import { AdminPageLayout } from "@/components/Admin/AdminPageLayout/AdminPageLayout";

const Categories = () => {
	const [isAddingCategory, changeAddingMode] = React.useState<boolean>(false);

	const { data: categories, isLoading, isError } = useGetCategories();

	const { mutate: addCategory } = useAddCategory();
	const { mutate: editCategory } = useEditCategory();
	const { mutate: deleteCategory } = useDeleteCategory();

	const onSaveCategory = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const title: string = (
			(event.target as HTMLFormElement).elements.namedItem("title") as HTMLInputElement
		).value;

		const fileInput = (event.target as HTMLFormElement).elements.namedItem(
			"image"
		) as HTMLInputElement;

		const image = fileInput?.files ? fileInput.files[0] : null;

		const formData = new FormData();
		formData.append("title", title);
		if (image === null) {
			throw new Error("You didnt choose the file");
		}
		formData.append("image", image);

		addCategory(formData);
		changeAddingMode((prev) => !prev);
	};

	if (isLoading || isError) {
		return <div>Loading...</div>;
	}

	return (
		<AdminPageLayout
			isAdding={isAddingCategory}
			onSaveForm={onSaveCategory}
			changeAddingMode={changeAddingMode}
			isInputNeeded={true}
			createBtnText="Додати категорію"
			inputText="Назва нової категорії"
			insertImgText="Завантажити обкладинку">
			<>
				{categories.map((category: Category) => (
					<AdminCategory
						key={category.id}
						edit={editCategory}
						deleteItem={deleteCategory}
						{...category}
					/>
				))}
			</>
		</AdminPageLayout>
	);
};

export default Categories;
