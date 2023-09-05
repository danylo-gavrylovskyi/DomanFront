import React from "react";
import { Button, Paper } from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";

import { Category } from "@/types/category.interface";

import styles from "./AdminCategory.module.scss";

interface AdminCategoryProps extends Category {
	imageFolder?: string;
	subcategoryParent?: Category;
	edit: UseMutateFunction<
		Category,
		unknown,
		{
			categoryId: number;
			formData: FormData;
		},
		unknown
	>;
	deleteItem: UseMutateFunction<number, unknown, number, unknown>;
}

export const AdminCategory = ({
	id,
	title,
	image,
	edit,
	deleteItem,
	imageFolder = "categoriesImages",
	subcategoryParent,
}: AdminCategoryProps) => {
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

		edit({ categoryId: id, formData });
		changeEditingMode((prev) => !prev);
	};

	return (
		<Paper elevation={3} className={styles.container}>
			<img
				style={isEditing ? { display: "none" } : { display: "block" }}
				width={"8%"}
				src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${
					subcategoryParent ? "subcategoriesImages" : "categoriesImages"
				}/${image}`}></img>

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
			<Button onClick={() => deleteItem(id)} variant="contained" color="error">
				Видалити
			</Button>
		</Paper>
	);
};
