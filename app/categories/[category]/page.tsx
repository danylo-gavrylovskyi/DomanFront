"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { toggleFilter } from "@/redux/features/filterSlice";

import { useGetCategories } from "@/hooks/categories.hooks";
import { useGetSubcategories } from "@/hooks/subcategories.hooks";
import { useGetProducts } from "@/hooks/products.hooks";
import { useGetAttributes } from "@/hooks/attributes.hooks";

import { Category, Subcategory } from "@/types/category.interface";
import { Product } from "@/types/product.interface";
import { UniqueAttribute } from "@/types/unique-attribute.interface";

import { SkeletonPage } from "@/modules/SkeletonPage/SkeletonPage";
import { Filter } from "@/modules/Filter/Filter";

import { CategoryCard } from "@/components/CategoryCard/CategoryCard";
import { FilterBlock } from "@/components/FilterBlock/FilterBlock";
import { Item } from "@/components/Item/Item";

import { findUniqueAttributesInCategory } from "@/utils/findUniqueAttributes";
import { findAttribute } from "@/utils/findAttribute";

import styles from "./CategoryPage.module.scss";

const page = () => {
	const dispatch = useDispatch();

	let categoryTitle: string = useParams().category as string;
	categoryTitle = categoryTitle.replace("%20", " ");

	const category: Category | undefined = useGetCategories().data?.find(
		(category) => category.title === categoryTitle
	);

	const checkedAttributes = useSelector((state: RootState) => state.filter.checkedAttributes);

	const { data: subcategories } = useGetSubcategories();

	let products = useGetProducts().data?.filter(
		(product: Product) => product.subcategory?.categoryId === category?.id
	);

	const { data: attributes } = useGetAttributes();

	if (!category || !attributes || !products || !subcategories) {
		return <SkeletonPage />;
	}

	let uniqueAttributes: UniqueAttribute[] = findUniqueAttributesInCategory(
		category,
		subcategories,
		products
	);

	if (checkedAttributes.length > 0) {
		products = products.filter((product) =>
			product.attributes?.some((attr) => checkedAttributes.includes(attr.attributeValue))
		);
	}

	if (uniqueAttributes.length <= 0) {
		return <SkeletonPage />;
	}

	return (
		<div className={styles.container}>
			<p className={styles.title}>
				<img
					width={"5%"}
					alt="category"
					src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/categoriesImages/${category.image}`}
				/>
				{category.title}
			</p>
			<div className={styles.subcategories}>
				{category.subcategories?.map((subcategory: Subcategory) => (
					<section className={styles.subcategoryCard} key={subcategory.id}>
						<CategoryCard
							imageFolder="subcategoriesImages"
							id={subcategory.id}
							image={subcategory.image}
							title={subcategory.title}
						/>
					</section>
				))}
			</div>
			<div className={styles.filterBtn}>
				<button onClick={() => dispatch(toggleFilter())}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="25%"
						viewBox="0 0 64 64"
						strokeWidth="3"
						stroke="#ffffff"
						fill="none">
						<line x1="50.69" y1="32" x2="56.32" y2="32" />
						<line x1="7.68" y1="32" x2="38.69" y2="32" />
						<line x1="26.54" y1="15.97" x2="56.32" y2="15.97" />
						<line x1="7.68" y1="15.97" x2="14.56" y2="15.97" />
						<line x1="35" y1="48.03" x2="56.32" y2="48.03" />
						<line x1="7.68" y1="48.03" x2="23" y2="48.03" />
						<circle cx="20.55" cy="15.66" r="6" />
						<circle cx="44.69" cy="32" r="6" />
						<circle cx="29" cy="48.03" r="6" />
					</svg>
					Фільтр
				</button>
			</div>
			<Filter uniqueAttributes={uniqueAttributes} attributes={attributes} />
			<div className={styles.filterProd}>
				<aside className={styles.filter}>
					{uniqueAttributes.map((uniqueAttribute) => (
						<FilterBlock
							key={uniqueAttribute.attrId}
							attributeName={
								findAttribute(attributes, uniqueAttribute.attrId) &&
								findAttribute(attributes, uniqueAttribute.attrId).title
							}
							attributeValues={uniqueAttribute.values}
						/>
					))}
				</aside>
				<main className={styles.products}>
					{products.map((product) => (
						<Item key={product.id} {...product} />
					))}
				</main>
			</div>
		</div>
	);
};

export default page;
