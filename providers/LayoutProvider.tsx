"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Header } from "@/modules/Header/Header";
import { Footer } from "@/modules/Footer/Footer";

import { Product } from "@/types/product.interface";

export const HeaderProvider: React.FC<{ products: Product[] }> = ({ products }) => {
	const pathname = usePathname();
	return <>{!pathname.includes("admin") && <Header products={products} />}</>;
};

export const FooterProvider = () => {
	const pathname = usePathname();
	return <>{!pathname.includes("admin") && <Footer />}</>;
};
