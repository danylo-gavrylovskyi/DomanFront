import React from "react";
import { Paper } from "@mui/material";

import styles from "./Item.module.scss";

export const Item = () => {
  return (
    <Paper elevation={3} style={{ display: "flex", flexDirection: "column" }}>
      <section className={styles.imgBg}>
        <img width="100%" src="./test.jpg" alt="item"></img>
      </section>
      <section>
        <div className={styles.title}>
          <span>БОЙЛЕР MIDEA PRIME D80-15EFG (W) 80Л З WI-FI</span>
        </div>
        <div className={styles.buyBtnAndPrice}>
          <button className={styles.addToCart}>Додати</button>
          <span>7254грн</span>
        </div>
      </section>
    </Paper>
  );
};
