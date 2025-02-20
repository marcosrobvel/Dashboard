import { createAsyncThunk } from "@reduxjs/toolkit";
import { addFavourite } from "./favouritesSlice";

export const favouriteThunk = createAsyncThunk(
  "favourites/fetchFavourites",
  async (image, { dispatch }) => {
    try {
      dispatch(addFavourite(image));
    } catch (error) {
      console.log("Error al añadir la imagen a favoritos:", error);
    }
  }
);