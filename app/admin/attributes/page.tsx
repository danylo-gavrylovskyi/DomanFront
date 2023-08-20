"use client";

import React from "react";
import { useSelector } from "react-redux";

import { addAttribute, fetchAttributes } from "@/redux/features/admin/adminAttributesSlice";
import { RootState, useAppDispatch } from "@/redux/store";

import { Attribute } from "@/types/Attribute";

import { AdminPageLayout } from "@/components/Admin/AdminPageLayout/AdminPageLayout";
import { AdminAttribute } from "@/components/Admin/AdminAttribute/AdminAttribute";

const page = () => {
	const [isAddingAttribute, changeAddingMode] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();
	const attributes: Attribute[] = useSelector(
		(state: RootState) => state.adminAttributes.attributes
	);

	const onSaveAttribute = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const title: string = (
			(event.target as HTMLFormElement).elements.namedItem("title") as HTMLInputElement
		).value;
		dispatch(addAttribute(title));
		changeAddingMode((prev) => !prev);
	};

	React.useEffect(() => {
		dispatch(fetchAttributes());
	}, []);

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
					<AdminAttribute key={attribute.id} {...attribute} />
				))}
			</>
		</AdminPageLayout>
	);
};

export default page;
