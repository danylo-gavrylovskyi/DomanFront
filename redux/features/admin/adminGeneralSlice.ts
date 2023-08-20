import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "@/utils/axios";

export const fetchBanners = createAsyncThunk("admin/fetchingBanners", async () => {
	const { data } = await axios.get("/banners");
	return data as string[];
});

export const addBanner = createAsyncThunk("admin/addingBanner", async (banner: FormData) => {
	const { data } = await axios.post("/banners", banner);
	return data as string;
});

export const deleteBanner = createAsyncThunk("admin/deletingBanner", async (bannerUrl: string) => {
	const { data } = await axios.delete(`/banners/${bannerUrl}`);
	return data as string;
});

const initialState = {
	activeCategoryIndex:
		typeof window !== "undefined" ? Number(sessionStorage.getItem("activeTab")) : 0,
	banners: [] as string[],
	currentBanner: 0,
};

const adminGeneralSlice = createSlice({
	name: "adminGeneral",
	initialState,
	reducers: {
		setActiveCategory: (state, action: PayloadAction<number>) => {
			state.activeCategoryIndex = action.payload;
			sessionStorage.setItem("activeTab", String(action.payload));
		},
		nextBanner: (state) => {
			if (state.currentBanner === state.banners.length - 1) {
				state.currentBanner = 0;
			} else {
				state.currentBanner++;
			}
		},
		previousBanner: (state) => {
			if (state.currentBanner === 0) {
				state.currentBanner = state.banners.length - 1;
			} else {
				state.currentBanner--;
			}
		},
		setCurrentBanner: (state, action: PayloadAction<number>) => {
			state.currentBanner = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchBanners.fulfilled, (state, action: PayloadAction<string[]>) => {
			state.banners = action.payload;
		});
		builder.addCase(addBanner.fulfilled, (state, action: PayloadAction<string>) => {
			state.banners = [...state.banners, action.payload];
		});
		builder.addCase(deleteBanner.fulfilled, (state, action: PayloadAction<string>) => {
			state.banners = state.banners.filter((banner) => banner !== action.payload);
		});
	},
});

export const { setActiveCategory, nextBanner, previousBanner, setCurrentBanner } =
	adminGeneralSlice.actions;
export default adminGeneralSlice.reducer;
