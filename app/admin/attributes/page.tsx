"use client";

import React from "react";

import { Attribute } from "@/types/attribute.interface";

import { AdminPageLayout } from "@/components/Admin/AdminPageLayout/AdminPageLayout";
import { AdminAttribute } from "@/components/Admin/AdminAttribute/AdminAttribute";

import { useAddAttribute, useDeleteAttribute, useGetAttributes } from "@/hooks/attributes.hooks";

const page = () => {
	const [isAddingAttribute, changeAddingMode] = React.useState<boolean>(false);

	const { data: attributes } = useGetAttributes();

	const { mutate: addAttribute } = useAddAttribute();
	const { mutate: deleteAttribute } = useDeleteAttribute();

	const onSaveAttribute = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const title: string = (
			(event.target as HTMLFormElement).elements.namedItem("title") as HTMLInputElement
		).value;

		addAttribute(title);
		changeAddingMode((prev) => !prev);
	};

	if (!attributes) {
		return <div>Loading...</div>;
	}

	return (
		<AdminPageLayout
			isAdding={isAddingAttribute}
			onSaveForm={onSaveAttribute}
			changeAddingMode={changeAddingMode}
			isImageInputNeeded={false}
			isInputNeeded={true}
			inputText="Назва атрибуту"
			createBtnText="Додати атрибут">
			<>
				{attributes.map((attribute: Attribute) => (
					<AdminAttribute
						key={attribute.id}
						deleteAttribute={deleteAttribute}
						{...attribute}
					/>
				))}
			</>
		</AdminPageLayout>
	);
};

export default page;
