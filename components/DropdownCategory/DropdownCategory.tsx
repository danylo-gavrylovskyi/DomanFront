import React from "react";

import { Category } from "@/types/Category";

import styles from "./DropdownCategory.module.scss";

export const DropdownCategory = ({ title, image }: Category) => {
	return (
		<div className={styles.container}>
			<img
				width="20%"
				src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/categoriesImages/${image}`}></img>
			<p>{title}</p>
		</div>
	);
};
