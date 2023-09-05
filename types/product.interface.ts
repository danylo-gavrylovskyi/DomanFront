import { Attribute, AttributeIdValuePair } from "./attribute.interface";
import { Subcategory } from "./category.interface";

export interface Product {
	id: number;
	title: string;
	description: string;
	slug: string;
	article: string;
	quantity: number;
	subcategoryId: number;
	price: number;
	image: string;
	attributes?: Attribute[];
	subcategory?: Subcategory;
}

export interface CreateProductForm {
	title: string;
	description: string;
	article: string;
	quantity: number;
	subcategoryId: number;
	price: number;
}

export interface CreateProduct extends CreateProductForm {
	slug: string;
	attributeValues: AttributeIdValuePair[];
}

export interface CartProduct {
	product: Product;
	quantity: number;
}
