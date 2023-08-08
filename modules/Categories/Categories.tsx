import React from "react";

import { CategoryCard } from "../../components/CategoryCard/CategoryCard";

import styles from "./Categories.module.scss";

export const Categories = () => {
  return (
    <div className={styles.container}>
      <p>Категорії товарів</p>
      <div className={styles.grid}>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  );
};
