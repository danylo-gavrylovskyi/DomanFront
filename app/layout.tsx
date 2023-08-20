import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ReduxProvider } from "@/redux/provider";
import { LayoutProvider } from "@/components/LayoutProvider";
import { Cart } from "@/modules/Cart/Cart";
import { HamburgerMenu } from "@/modules/HamburgerMenu/HamburgerMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Doman",
	description: "Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
			<ReduxProvider>
				<body className={inter.className}>
					<Cart />
					<HamburgerMenu />
					<LayoutProvider />
					{children}
				</body>
			</ReduxProvider>
		</html>
	);
}
