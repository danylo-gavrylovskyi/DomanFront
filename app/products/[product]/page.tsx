"use client";

import React from "react";
import { Paper } from "@mui/material";
import slugify from "slugify";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "@/redux/store";
import { fetchProducts } from "@/redux/features/admin/adminProductsSlice";
import { addToCart } from "@/redux/features/cartSlice";

import styles from "./ProductPage.module.scss";

const ProductPage = () => {
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	let productSlug: string = useParams().product as string;
	const product = useSelector((state: RootState) => state.adminProducts.products).find(
		(prod) => prod.slug === productSlug
	);

	if (!product) return <div>Loading...</div>;

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<Paper elevation={16} className={styles.paper}>
					<img
						src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/productsImages/${product.image}`}
						alt="productSlug"></img>
				</Paper>
				<div>
					<p className={styles.title}>{product.title}</p>
					<p className={styles.price}>{product.price}грн.</p>
					<p className={styles.descr}>{product.description}</p>
					<button onClick={() => dispatch(addToCart(product))} className={styles.addToCart}>
						Додати
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
