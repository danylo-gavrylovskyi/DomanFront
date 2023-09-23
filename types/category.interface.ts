import { Product } from "./product.interface";

export interface Category {
	id: number;
	title: string;
	slug: string;
	image: string;
	subcategories?: Subcategory[];
}

export interface Subcategory extends Category {
	categoryId: number;
	products?: Product[];
}
