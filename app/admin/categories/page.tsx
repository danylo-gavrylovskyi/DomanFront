"use client";

import React from "react";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "@/redux/store";
import {
	addCategory,
	deleteCategory,
	editCategory,
	fetchCategories,
} from "@/redux/features/admin/adminCategoriesSlice";

import { Category } from "@/types/Category";

import { AdminCategory } from "@/components/Admin/AdminCategory/AdminCategory";
import { AdminPageLayout } from "@/components/Admin/AdminPageLayout/AdminPageLayout";

const Categories = () => {
	const [isAddingCategory, changeAddingMode] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();
	const categories: Category[] = useSelector(
		(state: RootState) => state.adminCategories.categories
	);

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

		dispatch(addCategory(formData));
		changeAddingMode((prev) => !prev);
	};

	React.useEffect(() => {
		dispatch(fetchCategories());
	}, []);

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
