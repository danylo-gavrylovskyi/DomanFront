import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpened: false,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		changeCartStatus: (state) => {
			state.isOpened = !state.isOpened;
		},
	},
});

export const { changeCartStatus } = cartSlice.actions;
export default cartSlice.reducer;
