"use client";

import React from "react";
import Link from "next/link";
import { Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { usePathname } from "next/navigation";

import { RootState } from "@/redux/store";
import { setActiveCategory } from "@/redux/features/admin/adminGeneralSlice";

import styles from "./AdminLayout.module.scss";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	const activeCategoryIndex = useSelector(
		(state: RootState) => state.adminGeneral.activeCategoryIndex
	);
	const dispatch = useDispatch();

	const sections = [
		{ href: "products", name: "Товари" },
		{ href: "categories", name: "Категорії" },
		{ href: "subcategories", name: "Підкатегорії" },
		{ href: "banners", name: "Банери" },
		{ href: "attributes", name: "Атрибути" },
	];

	const pathname = usePathname().split("/");

	return (
		<>
			<aside className={styles.menu}>
				<Link href="/">
					<div className={styles.logo}>
						<img width={"150px"} src="/logo.png"></img>
					</div>
				</Link>
				<div className={styles.sections}>
					{sections.map((section, index) => (
						<Link key={section.href} href={`/admin/${section.href}`}>
							<section
								onClick={() => {
									dispatch(setActiveCategory(index));
								}}
								className={
									pathname[pathname.length - 1] === section.href ? styles.active : ""
								}>
								{section.name}
							</section>
						</Link>
					))}
					<section
						onClick={() => {
							dispatch(setActiveCategory(sections.length));
						}}
						className={activeCategoryIndex === sections.length ? styles.active : ""}>
						Сторінки
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30px"
							height="30px"
							viewBox="0 0 24 24"
							fill="none">
							<path
								d="M7 10L12 15L17 10"
								stroke="#fff"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</section>
				</div>
			</aside>
			<Paper className={styles.paper} elevation={3}>
				{children}
			</Paper>
		</>
	);
};

export default AdminLayout;
