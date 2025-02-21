import { createAsyncThunk } from "@reduxjs/toolkit";
import { toggleFavourite } from "./favouritesSlice";

export const favouriteThunk = createAsyncThunk(
  "favourites/fetchFavourites",
  async (image, { dispatch }) => {
    try {
      dispatch(toggleFavourite(image));
    } catch (error) {
      console.log("Error al añadir la imagen a favoritos:", error);
    }
  }
);