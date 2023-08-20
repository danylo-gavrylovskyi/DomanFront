import React from "react";
import { Button, Paper } from "@mui/material";

import { useAppDispatch } from "@/redux/store";
import { deleteAttribute } from "@/redux/features/admin/adminAttributesSlice";

import { Attribute } from "@/types/Attribute";

import styles from "./AdminAttribute.module.scss";

export const AdminAttribute = ({ id, title }: Attribute) => {
	const dispatch = useAppDispatch();
	return (
		<Paper elevation={3} className={styles.container}>
			<p>{title}</p>
			<Button onClick={() => dispatch(deleteAttribute(id))} variant="contained" color="error">
				Видалити
			</Button>
		</Paper>
	);
};
