import React from "react";
import { Button, Paper } from "@mui/material";

import { deleteProduct } from "@/redux/features/admin/adminProductsSlice";
import { RootState, useAppDispatch } from "@/redux/store";

import { Product } from "@/types/Product";

import styles from "./AdminCategory/AdminCategory.module.scss";
import { useSelector } from "react-redux";
import Link from "next/link";

export const AdminProduct = ({
	id,
	title,
	quantity,
	price,
	image,
	article,
	subcategoryId,
}: Product) => {
	const dispatch = useAppDispatch();
	const subcategory = useSelector((state: RootState) =>
		state.adminSubcategories.subcategories.find((subcategory) => subcategory.id === subcategoryId)
	);
	return (
		<Paper elevation={3} className={styles.container}>
			<img
				width={"15%"}
				src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/productsImages/${image}`}></img>
			<div className={styles.productInfo}>
				<p>Назва: {title}</p>
				<p>Артикул: {article}</p>
				<p>Кількість: {quantity}шт.</p>
				<p>Ціна: {price}грн</p>
				<p>Підкатегорія: {subcategory?.title}</p>
			</div>

			<Link href={`/admin/products/${id}`}>
				<Button variant="contained">Змінити</Button>
			</Link>
			<Button onClick={() => dispatch(deleteProduct(id))} variant="contained" color="error">
				Видалити
			</Button>
		</Paper>
	);
};
