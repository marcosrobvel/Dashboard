import { createSlice } from '@reduxjs/toolkit';

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites: JSON.parse(localStorage.getItem('myPhotos')) || [],
  },
  reducers: {
    addFavourite: (state, action) => {
      state.favourites.push(action.payload);
      localStorage.setItem('myPhotos', JSON.stringify(state.favourites));
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter(photo => photo.id !== action.payload);
      localStorage.setItem('myPhotos', JSON.stringify(state.favourites));
    },
    editDescription: (state, action) => {
      const index = state.favourites.findIndex(photo => photo.id === action.payload.id);
      if (index !== -1) {
        state.favourites[index].alt_description = action.payload.description;
        localStorage.setItem('myPhotos', JSON.stringify(state.favourites));
      }
    },
  },
});

export const { addFavourite, removeFavourite, editDescription } = favouritesSlice.actions;

export default favouritesSlice.reducer;