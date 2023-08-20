import React from "react";
import { Button, Paper } from "@mui/material";

import { useAppDispatch } from "@/redux/store";

import { Category, Subcategory } from "@/types/Category";

import styles from "./AdminCategory.module.scss";
import { AsyncThunk } from "@reduxjs/toolkit";

interface AdminCategoryProps extends Category {
	subcategoryParent?: Category;
	edit:
		| AsyncThunk<
				Category,
				{
					id: number;
					formData: FormData;
				},
				any
		  >
		| AsyncThunk<
				Subcategory,
				{
					id: number;
					formData: FormData;
				},
				any
		  >;
	deleteItem: AsyncThunk<number, number, any>;
}

export const AdminCategory = ({
	id,
	title,
	image,
	edit,
	deleteItem,
	subcategoryParent,
}: AdminCategoryProps) => {
	const dispatch = useAppDispatch();
	const [isEditing, changeEditingMode] = React.useState<boolean>(false);

	const onSaveEditCategory = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const title = (
			(event.target as HTMLFormElement).elements.namedItem("title") as HTMLInputElement
		).value;

		const fileInput = (event.target as HTMLFormElement).elements.namedItem(
			"image"
		) as HTMLInputElement;

		const image = fileInput?.files ? fileInput.files[0] : null;

		const formData = new FormData();
		formData.append("title", title);
		if (image) {
			formData.append("image", image);
		}
		dispatch(edit({ id, formData }));
		changeEditingMode((prev) => !prev);
	};

	return (
		<Paper elevation={3} className={styles.container}>
			<img
				style={isEditing ? { display: "none" } : { display: "block" }}
				width={"8%"}
				src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/categoriesImages/${image}`}></img>

			<form
				style={isEditing ? { display: "flex" } : {}}
				className={styles.form}
				onSubmit={onSaveEditCategory}>
				<label className={styles.newImgLabel} htmlFor="newCategoryImg">
					Нова обкладинка
					<input name="image" id="newCategoryImg" type="file"></input>
				</label>

				<input
					className={styles.newTitleInput}
					name="title"
					placeholder="Введіть нову назву"></input>

				<Button type="submit" variant="contained">
					Зберегти
				</Button>
			</form>

			<p style={isEditing ? { display: "none" } : { display: "block" }}>
				{subcategoryParent ? `${title} (${subcategoryParent?.title})` : title}
			</p>

			<Button
				onClick={() => changeEditingMode((prev) => !prev)}
				style={isEditing ? { display: "none" } : { display: "block" }}
				variant="contained">
				Змінити
			</Button>
			<Button onClick={() => dispatch(deleteItem(id))} variant="contained" color="error">
				Видалити
			</Button>
		</Paper>
	);
};
