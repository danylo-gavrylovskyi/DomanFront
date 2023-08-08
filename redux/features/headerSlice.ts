import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isSearchOpened: false,
};

export const headerSlice = createSlice({
	name: "header",
	initialState,
	reducers: {
		setIsSearchOpened: (state) => {
			state.isSearchOpened = !state.isSearchOpened;
		},
	},
});

export const { setIsSearchOpened } = headerSlice.actions;
export default headerSlice.reducer;
