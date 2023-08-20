export interface Category {
	id: number;
	title: string;
	image: string;
}

export interface Subcategory extends Category {
	categoryId: number;
}
