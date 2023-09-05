export interface Attribute {
	id: number;
	title: string;
	attributeId: number;
	attributeValue: string;
}

export type AttributeIdValuePair = [categoryId: number, value: string];
