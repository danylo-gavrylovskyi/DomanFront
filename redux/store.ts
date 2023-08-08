import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cartSlice";
import adminSlice from "./features/adminSlice";
import homeSlice from "./features/homeSlice";

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		admin: adminSlice,
		home: homeSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
