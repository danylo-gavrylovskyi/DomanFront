import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    currentImageIndex: 0,
    images: []
}

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        
    },
    extraReducers: {

    }
})