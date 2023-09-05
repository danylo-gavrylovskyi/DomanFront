import React from "react";
import { Paper } from "@mui/material";

import { Product } from "@/types/product.interface";

import { FindedProduct } from "../FindedProduct/FindedProduct";

import styles from "./FindedProducts.module.scss";

export const FindedProducts = ({ products }: { products: Product[] }) => {
	return (
		<>
			<div className={styles.darkBg}></div>
			<Paper className={styles.paper}>
				{products.map((product) => (
					<FindedProduct key={product.id} {...product} />
				))}
			</Paper>
		</>
	);
};
