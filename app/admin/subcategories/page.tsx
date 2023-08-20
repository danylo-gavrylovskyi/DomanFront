"use client";

import React from "react";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "@/redux/store";

import { Category, Subcategory } from "@/types/Category";

import { AdminCategory } from "@/components/Admin/AdminCategory/AdminCategory";
import { AdminPageLayout } from "@/components/Admin/AdminPageLayout/AdminPageLayout";
import {
	addSubcategory,
	deleteSubcategory,
	editSubcategory,
	fetchSubcategories,
} from "@/redux/features/admin/adminSubcategoriesSlice";

const Subcategories = () => {
	const [isAddingCategory, changeAddingMode] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();
	const subcategories: Subcategory[] = useSelector(
		(state: RootState) => state.adminSubcategories.subcategories
	);
	const categories: Category[] = useSelector(
		(state: RootState) => state.adminCategories.categories
	);

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

		dispatch(addSubcategory(formData));
		changeAddingMode((prev) => !prev);
	};

	React.useEffect(() => {
		dispatch(fetchSubcategories());
	}, []);

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
