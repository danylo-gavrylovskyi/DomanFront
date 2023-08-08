import React from "react";
import { Paper } from "@mui/material";

import styles from "./CategoryCard.module.scss";

export const CategoryCard = () => {
  return (
    <Paper elevation={3} className={styles.container}>
      <img width={"30%"} alt="category" src="/category.png"></img>
      <span>Рушникосушки</span>
    </Paper>
  );
};
