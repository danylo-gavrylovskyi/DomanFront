import { Inter } from "next/font/google";
import type { Metadata } from "next";

import { Cart } from "@/modules/Cart/Cart";
import { HamburgerMenu } from "@/modules/HamburgerMenu/HamburgerMenu";

import { FooterProvider, HeaderProvider } from "@/providers/LayoutProvider";
import { AuthProvider } from "@/providers/auth-provider/AuthProvider";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { ReduxProvider } from "@/redux/provider";

import { ProductsService } from "@/services/products.service";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Doman",
	description: "Description",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const products = await ProductsService.getAll();

	return (
		<html lang="en">
			<link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
			<body className={inter.className}>
				<ReduxProvider>
					<ReactQueryProvider>
						<AuthProvider>
							<Cart />
							<HamburgerMenu />
							<HeaderProvider products={products} />
							{children}
							<FooterProvider />
						</AuthProvider>
					</ReactQueryProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
