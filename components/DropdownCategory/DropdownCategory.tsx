import React from "react";
import Link from "next/link";

import { Category } from "@/types/category.interface";

import styles from "./DropdownCategory.module.scss";

export const DropdownCategory = ({ title, image }: Category) => {
	return (
		<Link href={`/categories/${title}`}>
			<div className={styles.container}>
				<img
					width="20%"
					src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/categoriesImages/${image}`}></img>
				<p>{title}</p>
			</div>
		</Link>
	);
};
