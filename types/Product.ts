import { Attribute } from "./Attribute";

export interface Product {
	id: number;
	title: string;
	article: string;
	quantity: number;
	subcategoryId: number;
	price: number;
	image: string;
	attributes?: Attribute[];
}
