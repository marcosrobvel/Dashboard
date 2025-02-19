import { createSlice } from "@reduxjs/toolkit";
import { homeThunk } from "./homeThunk";

export const homeSlice = createSlice({
    name: 'images',
    initialState: {
        status: 'idle',
        data: [],
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(homeThunk.pending, (state) => {
            state.status='pending'
        })
        .addCase(homeThunk.fulfilled, (state, action) => {
            state.status='fulfilled'
            state.data = action.payload
        })
        .addCase(homeThunk.rejected, (state, action) => {
            state.status='rejected'
            state.error = action.error.message
        })
    }
  });

  export const getDataImages = (state) => state.images.data
  export const getStatusImages = (state) => state.images.status