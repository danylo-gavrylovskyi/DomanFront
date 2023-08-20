import React from "react";
import { Paper } from "@mui/material";

import { Category } from "@/types/Category";

import styles from "./CategoryCard.module.scss";

export const CategoryCard = ({ title, image }: Category) => {
	return (
		<Paper elevation={3} className={styles.container}>
			<img
				width={"20%"}
				alt="category"
				src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/categoriesImages/${image}`}></img>
			<span>{title}</span>
		</Paper>
	);
};
