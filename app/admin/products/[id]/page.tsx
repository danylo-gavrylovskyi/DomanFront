"use client";

import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";

import { RootState, useAppDispatch } from "@/redux/store";
import { fetchSubcategories } from "@/redux/features/admin/adminSubcategoriesSlice";
import { fetchAttributes } from "@/redux/features/admin/adminAttributesSlice";
import { editProduct, fetchProducts } from "@/redux/features/admin/adminProductsSlice";

import { Subcategory } from "@/types/Category";
import { Attribute, ReceivedAttribute } from "@/types/Attribute";

import styles from "../new/AddProduct.module.scss";
import { AttributeIdValuePair } from "../new/page";
import { Product } from "@/types/Product";

const UpdateProduct = () => {
	const { push } = useRouter();
	const { id } = useParams();

	React.useEffect(() => {
		dispatch(fetchProducts());
		dispatch(fetchSubcategories());
		dispatch(fetchAttributes());
	}, []);

	const dispatch = useAppDispatch();
	const product: Product | undefined = useSelector((state: RootState) =>
		state.adminProducts.products.find((product: Product) => product.id === Number(id))
	);
	const subcategories: Subcategory[] = useSelector(
		(state: RootState) => state.adminSubcategories.subcategories
	);
	const attributes: Attribute[] = useSelector(
		(state: RootState) => state.adminAttributes.attributes
	);

	const [attributeCount, setAttributeCount] = React.useState<number>(0);
	const [newAttributeValues, setNewAttributeValues] = React.useState<AttributeIdValuePair[]>([]);
	const [oldAttributeValues, setOldAttributeValues] = React.useState<AttributeIdValuePair[]>([]);

	const handleAttributeIdChange = (index: number, attributeId: string) => {
		const updatedAttrValues = [...newAttributeValues];
		updatedAttrValues[index] = [Number(attributeId), ""];
		setNewAttributeValues(updatedAttrValues);
	};
	const handleAttributeValueChange = (index: number, attributeValue: string) => {
		const updatedAttrValues = [...newAttributeValues];
		updatedAttrValues[index][1] = attributeValue;
		setNewAttributeValues(updatedAttrValues);
	};

	const handleOldAttrChange = (attributeId: number, attributeValue: string) => {
		setOldAttributeValues((prev) => [...prev, [attributeId, attributeValue]]);
	};

	if (!product) {
		return <div>Loading...</div>;
	}

	const getAttributeById = (id: number | undefined) => {
		return attributes.find((attribute) => attribute.id === id);
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
		if (title !== product.title) formData.append("title", title);

		if (article !== product.article) formData.append("article", article);

		if (Number(quantity) !== product.quantity) formData.append("quantity", quantity);

		if (Number(subcategoryId) !== product.subcategoryId)
			formData.append("subcategoryId", subcategoryId);

		if (+price !== +product.price) formData.append("price", price);

		if (image) formData.append("image", image);

		if (oldAttributeValues.length > 0)
			formData.append("oldAttributeValues", JSON.stringify(oldAttributeValues));

		if (newAttributeValues.length > 0)
			formData.append("newAttributeValues", JSON.stringify(newAttributeValues));

		dispatch(editProduct({ id: Number(id), formData }));
		push("/admin/products");
	};

	return (
		<>
			<header className={styles.heading}>Редагування товару</header>
			<form onSubmit={onSaveProduct} className={styles.form}>
				<main>
					<section>
						<TextField defaultValue={product.title} name="title" fullWidth label="Назва" />
						<TextField
							defaultValue={product?.article}
							name="article"
							fullWidth
							label="Артикул"
						/>
					</section>
					<section>
						<TextField
							defaultValue={product.subcategoryId}
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
						<TextField
							defaultValue={product.quantity}
							name="quantity"
							type="number"
							label="Кількість"
						/>
						<TextField defaultValue={product.price} name="price" type="number" label="Ціна" />
						<label className={styles.loadImg}>
							Обкладинка
							<input name="image" type="file"></input>
						</label>
					</section>
					{product.attributes?.map((attribute: ReceivedAttribute) => (
						<section>
							<TextField
								label="Атрибут"
								defaultValue={getAttributeById(attribute.attributeId)?.title}
								InputProps={{
									readOnly: true,
								}}
								variant="filled"
							/>
							<TextField
								onChange={(e) =>
									attribute.attributeId &&
									handleOldAttrChange(attribute.attributeId, e.target.value)
								}
								defaultValue={attribute.attributeValue}
								fullWidth
								label="Значення"
							/>
						</section>
					))}
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

export default UpdateProduct;
