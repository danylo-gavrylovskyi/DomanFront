import { CartProduct } from "@/types/product.interface";

export interface Order {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	orderedProducts: CartProduct[];
	totalPrice: number;
}
