"use client";

import React from "react";
import Link from "next/link";

import { useGetProducts } from "@/hooks/products.hooks";

import { AdminProduct } from "@/components/Admin/AdminProduct";

import { Product } from "@/types/product.interface";

import styles from "./AdminProducts.module.scss";

const AdminProducts = () => {
	const { data: products, isLoading, isError } = useGetProducts();

	if (isLoading || isError) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<header className={styles.header}>
				<Link href={"/admin/products/new"}>
					<button>Додати новий товар</button>
				</Link>
				<div className={styles.search}>
					<input placeholder="Я шукаю..."></input>
					<svg
						fill="rgb(34, 34, 34);"
						width="20px"
						height="20px"
						viewBox="0 0 1920 1920"
						xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path
								d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
								fillRule="evenodd"></path>
						</g>
					</svg>
				</div>
			</header>
			<main className={styles.main}>
				{products.map((product: Product) => (
					<AdminProduct key={product.id} {...product} />
				))}
			</main>
		</>
	);
};

export default AdminProducts;
