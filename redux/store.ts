import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import cartSlice from "./features/cartSlice";
import homeSlice from "./features/homeSlice";
import headerSlice from "./features/headerSlice";
import adminGeneralSlice from "./features/admin/adminGeneralSlice";
import adminCategoriesSlice from "./features/admin/adminCategoriesSlice";
import adminSubcategoriesSlice from "./features/admin/adminSubcategoriesSlice";
import adminAttributesSlice from "./features/admin/adminAttributesSlice";
import adminProductsSlice from "./features/admin/adminProductsSlice";

export const store = configureStore({
	reducer: {
		cart: cartSlice,
		home: homeSlice,
		header: headerSlice,
		adminGeneral: adminGeneralSlice,
		adminCategories: adminCategoriesSlice,
		adminSubcategories: adminSubcategoriesSlice,
		adminAttributes: adminAttributesSlice,
		adminProducts: adminProductsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
