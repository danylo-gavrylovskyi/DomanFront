"use client"

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeCartStatus } from "../../redux/features/cartSlice";
import { RootState } from "@/redux/store";

import styles from "./Cart.module.scss";

export const Cart = () => {
  const dispatch = useDispatch();
  const isCartOpened = useSelector((state: RootState) => state.cart.isOpened);

  return (
    <>
      <div
        onClick={() => dispatch(changeCartStatus())}
        className={`${styles.darkBg} ${
          isCartOpened ? styles.visible : styles.hidden
        }`}
      ></div>
      <div
        className={`${styles.container} ${
          isCartOpened ? styles.open : styles.close
        }`}
      >
        <header className={styles.header}>
          <svg
            onClick={() => dispatch(changeCartStatus())}
            className={styles.cartArrow}
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M10 7L15 12L10 17"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <span>Корзина</span>
        </header>
      </div>
    </>
  );
};
