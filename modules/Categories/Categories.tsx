"use client";

import React from "react";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "@/redux/store";
import { fetchCategories } from "@/redux/features/admin/adminCategoriesSlice";

import { Category } from "@/types/Category";

import { CategoryCard } from "../../components/CategoryCard/CategoryCard";

import styles from "./Categories.module.scss";

export const Categories = () => {
	const dispatch = useAppDispatch();
	React.useEffect(() => {
		dispatch(fetchCategories());
	}, []);

	const categories: Category[] = useSelector(
		(state: RootState) => state.adminCategories.categories
	);
	return (
		<div className={styles.container}>
			<p>Категорії товарів</p>
			<div className={styles.grid}>
				{categories.map((category: Category) => (
					<CategoryCard key={category.id} {...category} />
				))}
			</div>
		</div>
	);
};
