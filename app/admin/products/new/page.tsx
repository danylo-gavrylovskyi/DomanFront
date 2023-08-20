"use client";

import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState, useAppDispatch } from "@/redux/store";
import { fetchSubcategories } from "@/redux/features/admin/adminSubcategoriesSlice";
import { fetchAttributes } from "@/redux/features/admin/adminAttributesSlice";
import { addProduct } from "@/redux/features/admin/adminProductsSlice";

import { Subcategory } from "@/types/Category";
import { Attribute } from "@/types/Attribute";

import styles from "./AddProduct.module.scss";

export type AttributeIdValuePair = [categoryId: number, value: string];

const AddProduct = () => {
	const { push } = useRouter();

	const [attributeCount, setAttributeCount] = React.useState<number>(1);
	const [attributeValues, setAttributeValues] = React.useState<AttributeIdValuePair[]>([]);

	const dispatch = useAppDispatch();
	const subcategories = useSelector((state: RootState) => state.adminSubcategories.subcategories);
	const attributes = useSelector((state: RootState) => state.adminAttributes.attributes);

	React.useEffect(() => {
		dispatch(fetchSubcategories());
		dispatch(fetchAttributes());
	}, []);

	const handleAttributeIdChange = (index: number, attributeId: string) => {
		const updatedAttrValues = [...attributeValues];
		updatedAttrValues[index] = [Number(attributeId), ""];
		setAttributeValues(updatedAttrValues);
	};
	const handleAttributeValueChange = (index: number, attributeValue: string) => {
		const updatedAttrValues = [...attributeValues];
		updatedAttrValues[index][1] = attributeValue;
		setAttributeValues(updatedAttrValues);
	};

	const onSaveProduct = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const eventElements: HTMLFormControlsCollection = (event.target as HTMLFormElement).elements;

		const title: string = (eventElements.namedItem("title") as HTMLInputElement).value;
		const article: string = (eventElements.namedItem("article") as HTMLInputElement).value;
		const quantity: string = (eventElements.namedItem("quantity") as HTMLInputElement).value;
		const subcategoryId: string = (eventElements.namedItem("subcategoryId") as HTMLInputElement)
			.value;
		const price: string = (eventElements.namedItem("price") as HTMLInputElement).value;

		const fileInput = (event.target as HTMLFormElement).elements.namedItem(
			"image"
		) as HTMLInputElement;
		const image: File | null = fileInput?.files ? fileInput.files[0] : null;

		const formData = new FormData();
		formData.append("title", title);
		formData.append("article", article);
		formData.append("quantity", quantity);
		formData.append("subcategoryId", subcategoryId);
		formData.append("price", price);
		if (image === null) {
			throw new Error("You didnt choose the file");
		}
		formData.append("image", image);
		formData.append("attributeValues", JSON.stringify(attributeValues));
		dispatch(addProduct(formData));
		push("/admin/products");
	};

	return (
		<>
			<header className={styles.heading}>Додавання товару</header>
			<form onSubmit={onSaveProduct} className={styles.form}>
				<main>
					<section>
						<TextField name="title" fullWidth label="Назва" />
						<TextField name="article" fullWidth label="Артикул" />
					</section>
					<section>
						<TextField
							name="subcategoryId"
							className={styles.select}
							label="Підкатегорія"
							select>
							{subcategories.map((subcategory: Subcategory) => (
								<MenuItem key={subcategory.id} value={subcategory.id}>
									{subcategory.title}
								</MenuItem>
							))}
						</TextField>
						<TextField name="quantity" type="number" label="Кількість" />
						<TextField name="price" type="number" label="Ціна" />
						<label className={styles.loadImg}>
							Обкладинка
							<input name="image" type="file"></input>
						</label>
					</section>
					{[...Array(attributeCount)].map((el, index: number) => (
						<section key={index}>
							<TextField
								onChange={(e) => handleAttributeIdChange(index, e.target.value)}
								className={styles.select}
								label="Атрибут"
								select>
								{attributes.map((attribute: Attribute) => (
									<MenuItem key={attribute.id} value={attribute.id}>
										{attribute.title}
									</MenuItem>
								))}
							</TextField>
							<TextField
								onChange={(e) => handleAttributeValueChange(index, e.target.value)}
								fullWidth
								label="Значення"
							/>
							{index === attributeCount - 1 && (
								<button
									className={styles.deleteAttribute}
									type="button"
									onClick={() => setAttributeCount((prev) => --prev)}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="30px"
										height="30px"
										viewBox="0 0 24 24"
										fill="none">
										<path
											d="M19 5L5 19M5.00001 5L19 19"
											stroke="#000000"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							)}
						</section>
					))}
					<footer>
						<button type="submit">Зберегти</button>
						<button type="button" onClick={() => setAttributeCount((prev) => ++prev)}>
							Додати атрибут
						</button>
					</footer>
				</main>
			</form>
		</>
	);
};

export default AddProduct;
