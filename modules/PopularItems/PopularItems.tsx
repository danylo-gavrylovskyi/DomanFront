import React from "react";

import { Item } from "../../components/Item/Item";

import styles from "./PopularItems.module.scss";

export const PopularItems = () => {
  return (
    <div className={styles.container}>
      <p>Популярні товари</p>
      <main className={styles.mainGrid}>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
      </main>
    </div>
  );
};
