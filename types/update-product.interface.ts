import { AttributeIdValuePair } from "./attribute.interface";

export interface UpdateProduct {
	title: string;
	article: string;
	description: string;
	price: number;
	quantity: number;
	subcategoryId: number;
}
