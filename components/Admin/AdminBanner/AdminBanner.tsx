import { Button, Paper } from "@mui/material";
import React from "react";

import { useAppDispatch } from "@/redux/store";
import { deleteBanner } from "@/redux/features/admin/adminGeneralSlice";

import styles from "./AdminBanner.module.scss";

export const AdminBanner = ({ bannerUrl }: { bannerUrl: string }) => {
	const dispatch = useAppDispatch();
	return (
		<Paper elevation={3} className={styles.container}>
			<img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/banners/${bannerUrl}`}></img>
			<Button
				onClick={() => dispatch(deleteBanner(bannerUrl))}
				variant="contained"
				color="error">
				Видалити
			</Button>
		</Paper>
	);
};
