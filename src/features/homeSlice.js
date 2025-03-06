import { createSlice } from "@reduxjs/toolkit";
import { homeThunk } from "./homeThunk";

export const homeSlice = createSlice({
    name: 'images',
    initialState: {
        status: 'idle',
        data: [],
        error: null
    },
    reducers: {
        resetData: (state) => {
            state.data = []; 
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(homeThunk.pending, (state) => {
            state.status='pending'
        })
        .addCase(homeThunk.fulfilled, (state, action) => {
            state.status='fulfilled'
            const newImages = action.payload.results.filter(
                (image) => !state.data.some((existingImage) => existingImage.id === image.id)
            );
            state.data = [...state.data, ...newImages];
        })
        .addCase(homeThunk.rejected, (state, action) => {
            state.status='rejected'
            state.error = action.error.message
        })
    }
  });

  export const { resetData } = homeSlice.actions;
  export const getDataImages = (state) => state.images.data
  export const getStatusImages = (state) => state.images.status

/*
  const newImages = action.payload.filter(
    (image) => !state.data.some((existingImage) => existingImage.id === image.id)
  );
  state.data = [...state.data, ...newImages];*/