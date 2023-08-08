import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
	activeCategoryIndex: 0,
	isAddingNewCategory: false,
};

const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		setActiveCategory: (state, action: PayloadAction<number>) => {
			state.activeCategoryIndex = action.payload;
		},
		addNewCategory: (state) => {
			state.isAddingNewCategory = !state.isAddingNewCategory;
		},
	},
});

export const { setActiveCategory, addNewCategory } =
	adminSlice.actions;
export default adminSlice.reducer;
