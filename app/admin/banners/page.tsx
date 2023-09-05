"use client";

import React from "react";

import { useAddBanner, useDeleteBanner, useGetBanners } from "@/hooks/banners.hooks";

import { AdminBanner } from "@/components/Admin/AdminBanner/AdminBanner";
import { AdminPageLayout } from "@/components/Admin/AdminPageLayout/AdminPageLayout";

const page = () => {
	const [isAddingBanner, changeAddingMode] = React.useState<boolean>(false);

	const { data: banners } = useGetBanners();

	const { mutate: addBanner } = useAddBanner();
	const { mutate: deleteBanner } = useDeleteBanner();

	const onSaveBanner = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const fileInput = (event.target as HTMLFormElement).elements.namedItem(
			"image"
		) as HTMLInputElement;

		const image = fileInput?.files ? fileInput.files[0] : null;

		if (image) {
			addBanner(image);
		}
		changeAddingMode((prev) => !prev);
	};

	if (!banners) {
		return <div>Loading...</div>;
	}

	return (
		<AdminPageLayout
			isAdding={isAddingBanner}
			onSaveForm={onSaveBanner}
			changeAddingMode={changeAddingMode}
			createBtnText="Додати новий банер"
			insertImgText="Завантажити банер">
			<>
				{banners.map((banner: string) => (
					<AdminBanner key={banner} deleteBanner={deleteBanner} bannerUrl={banner} />
				))}
			</>
		</AdminPageLayout>
	);
};

export default page;
