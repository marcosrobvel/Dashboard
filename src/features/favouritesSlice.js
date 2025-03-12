import { createSlice } from '@reduxjs/toolkit';

const loadFavouritesFromLocalStorage = () => {
  const favourites = localStorage.getItem('favourites');
  return favourites ? JSON.parse(favourites) : [];
};

const saveFavouritesToLocalStorage = (favourites) => {
  localStorage.setItem('favourites', JSON.stringify(favourites));
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    status: 'idle', 
    data: loadFavouritesFromLocalStorage(), 
    error: null,  
  },
  reducers: {
    toggleFavourite: (state, action) => {
      const image = action.payload;

      
      if (!image || typeof image !== 'object' || !image.id) {
        console.error('Imagen inválida o sin id:', image);
        return;
      }

      const existingImage = state.data.find(fav => fav && fav.id === image.id);

      if (existingImage) {
        state.data = state.data.filter(fav => fav && fav.id !== image.id);
      } else {
        state.data.push(image);
      }

      saveFavouritesToLocalStorage(state.data);
    },

    resetFavourites: (state) => {
      state.data = [];
      saveFavouritesToLocalStorage([]);
    },

    removeFavourite: (state, action) => {
      const image = action.payload;

      state.data = state.data.filter(fav => fav && fav.id !== image.id);
      saveFavouritesToLocalStorage(state.data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('someAsyncAction/pending', (state) => {
        state.status = 'pending';
      })
      .addCase('someAsyncAction/fulfilled', (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase('someAsyncAction/rejected', (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  }
});

export const { toggleFavourite, removeFavourite, resetFavourites } = favouritesSlice.actions;

export const getFavourites = (state) => state.favourites.data;
export const getFavouritesStatus = (state) => state.favourites.status;
export const getFavouritesError = (state) => state.favourites.error;

export const favouritesReducer = favouritesSlice.reducer;


