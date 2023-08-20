export interface Attribute {
	id: number;
	title: string;
}

export interface ReceivedAttribute extends Attribute {
	attributeId?: number;
	attributeValue?: string;
}
