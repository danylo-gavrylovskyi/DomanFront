import { Attribute } from "@/types/attribute.interface";
import { Category, Subcategory } from "@/types/category.interface";
import { Product } from "@/types/product.interface";
import { UniqueAttribute } from "@/types/unique-attribute.interface";

export const findUniqueAttributesInSubcategory = (
	subcategory: Subcategory,
	products: Product[]
) => {
	let uniqueAttributes: UniqueAttribute[] = [];

	subcategory.products?.forEach((product: Product) => {
		const findedProduct = products.find((prod: Product) => prod.id === product.id);
		findedProduct?.attributes?.forEach((attribute: Attribute) => {
			const findedAttributeIndex = uniqueAttributes.findIndex(
				(pair) => pair.attrId === attribute.attributeId
			);
			if (findedAttributeIndex === -1) {
				uniqueAttributes.push({
					attrId: attribute.attributeId,
					values: [attribute.attributeValue],
				});
			} else {
				!uniqueAttributes[findedAttributeIndex].values.includes(attribute.attributeValue) &&
					uniqueAttributes[findedAttributeIndex].values.push(attribute.attributeValue);
			}
		});
	});

	return uniqueAttributes;
};

export const findUniqueAttributesInCategory = (
	category: Category,
	subcategories: Subcategory[],
	products: Product[]
) => {
	let uniqueAttributes: UniqueAttribute[] = [];

	category.subcategories?.forEach((subcat) => {
		const findedSubcat = subcategories.find((sub) => sub.id === subcat.id);
		findedSubcat?.products?.forEach((product) => {
			const findedProduct = products.find((prod: Product) => prod.id === product.id);
			findedProduct?.attributes?.forEach((attribute: Attribute) => {
				const findedAttributeIndex = uniqueAttributes.findIndex(
					(pair) => pair.attrId === attribute.attributeId
				);
				if (findedAttributeIndex === -1) {
					uniqueAttributes.push({
						attrId: attribute.attributeId,
						values: [attribute.attributeValue],
					});
				} else {
					!uniqueAttributes[findedAttributeIndex].values.includes(attribute.attributeValue) &&
						uniqueAttributes[findedAttributeIndex].values.push(attribute.attributeValue);
				}
			});
		});
	});

	return uniqueAttributes;
};
