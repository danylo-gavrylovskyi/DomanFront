"use client";

import React from "react";

import { Subcategory } from "@/types/category.interface";

import { AdminCategory } from "@/components/Admin/AdminCategory/AdminCategory";
import { AdminPageLayout } from "@/components/Admin/AdminPageLayout/AdminPageLayout";

import {
	useAddSubcategory,
	useDeleteSubcategory,
	useEditSubcategory,
	useGetSubcategories,
} from "@/hooks/subcategories.hooks";
import { useGetCategories } from "@/hooks/categories.hooks";

const Subcategories = () => {
	const [isAddingCategory, changeAddingMode] = React.useState<boolean>(false);

	const { data: subcategories } = useGetSubcategories();
	const { data: categories } = useGetCategories();

	const addSubcategory = useAddSubcategory();
	const editSubcategory = useEditSubcategory();
	const deleteSubcategory = useDeleteSubcategory();

	const onSaveCategory = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const categoryId: string = (
			(event.target as HTMLFormElement).elements.namedItem("categoryId") as HTMLInputElement
		).value;

		const title: string = (
			(event.target as HTMLFormElement).elements.namedItem("title") as HTMLInputElement
		).value;

		const fileInput = (event.target as HTMLFormElement).elements.namedItem(
			"image"
		) as HTMLInputElement;

		const image = fileInput?.files ? fileInput.files[0] : null;

		const formData = new FormData();
		formData.append("title", title);
		formData.append("categoryId", categoryId);
		if (image === null) {
			throw new Error("You didnt choose the file");
		}
		formData.append("image", image);

		addSubcategory(formData);
		changeAddingMode((prev) => !prev);
	};

	if (!subcategories || !categories) {
		return <div>Loading...</div>;
	}

	return (
		<AdminPageLayout
			isAdding={isAddingCategory}
			onSaveForm={onSaveCategory}
			changeAddingMode={changeAddingMode}
			isInputNeeded={true}
			isSelectNeeded={true}
			categories={categories}
			createBtnText="Додати підкатегорію"
			inputText="Назва нової підкатегорії"
			insertImgText="Завантажити обкладинку">
			<>
				{subcategories.map((subcategory: Subcategory) => (
					<AdminCategory
						key={subcategory.id}
						edit={editSubcategory}
						deleteItem={deleteSubcategory}
						imageFolder="subcategoriesImages"
						subcategoryParent={categories.find(
							(category) => category.id === subcategory.categoryId
						)}
						{...subcategory}
					/>
				))}
			</>
		</AdminPageLayout>
	);
};

export default Subcategories;
