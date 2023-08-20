"use client";

import React from "react";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "@/redux/store";
import { addBanner, fetchBanners } from "@/redux/features/admin/adminGeneralSlice";

import { AdminBanner } from "@/components/Admin/AdminBanner/AdminBanner";
import { AdminPageLayout } from "@/components/Admin/AdminPageLayout/AdminPageLayout";

const page = () => {
	const [isAddingBanner, changeAddingMode] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();
	const banners: string[] = useSelector((state: RootState) => state.adminGeneral.banners);

	const onSaveBanner = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const fileInput = (event.target as HTMLFormElement).elements.namedItem(
			"image"
		) as HTMLInputElement;

		const image = fileInput?.files ? fileInput.files[0] : null;
		const formData = new FormData();

		if (image) {
			formData.append("banner", image);
			dispatch(addBanner(formData));
		}
		changeAddingMode((prev) => !prev);
	};

	React.useEffect(() => {
		dispatch(fetchBanners());
	}, []);

	return (
		<AdminPageLayout
			isAdding={isAddingBanner}
			onSaveForm={onSaveBanner}
			changeAddingMode={changeAddingMode}
			createBtnText="Додати новий банер"
			insertImgText="Завантажити банер">
			<>
				{banners.map((banner: string) => (
					<AdminBanner key={banner} bannerUrl={banner} />
				))}
			</>
		</AdminPageLayout>
	);
};

export default page;
