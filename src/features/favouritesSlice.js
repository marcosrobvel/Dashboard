
/*
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
        data: loadFavouritesFromLocalStorage(),
    },
    reducers: {
        toggleFavourite: (state, action) => {
            console.log(action)
            const image = action.payload;
            const id = image?.id;

            if (!image || !image.urls || !image.urls.small) {
                console.error('Imagen inválida, falta "urls.small":', image);
                return;
            }

            console.log('Current favourites:', state.data); 
            console.log(image.id)
    
            const existingImage = state.data.find(fav => fav.id === id);
            console.log('Existing image in favourites:', existingImage);

            if (existingImage) {
                state.data = state.data.filter(fav => fav.id !== image.id);
            } else {
                state.data.push(image);
            }

            saveFavouritesToLocalStorage(state.data);
        }
    }
});

export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
*/


// Cargar los favoritos desde localStorage


import { createSlice } from '@reduxjs/toolkit';

const loadFavouritesFromLocalStorage = () => {
  const favourites = localStorage.getItem('favourites');
  return favourites ? JSON.parse(favourites) : [];
};

// Guardar los favoritos en localStorage
const saveFavouritesToLocalStorage = (favourites) => {
  localStorage.setItem('favourites', JSON.stringify(favourites));
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    status: 'idle',  // Estatus de la operación
    data: loadFavouritesFromLocalStorage(),  // Imágenes favoritas
    error: null,  // Error si lo hay
  },
  reducers: {
    toggleFavourite: (state, action) => {
      const image = action.payload;

      // Verificamos que 'image' no sea null ni undefined y que tenga una propiedad id
      if (!image || typeof image !== 'object' || !image.id) {
        console.error('Imagen inválida o sin id:', image);
        return;
      }

      // Verificamos si la imagen ya está en favoritos (comparando el id)
      const existingImage = state.data.find(fav => fav && fav.id === image.id);

      if (existingImage) {
        // Si ya está en favoritos, la eliminamos
        state.data = state.data.filter(fav => fav && fav.id !== image.id);
      } else {
        // Si no está en favoritos, la agregamos
        state.data.push(image);
      }

      // Guardamos el estado actualizado de favoritos en localStorage
      saveFavouritesToLocalStorage(state.data);
    },

    // Acción para resetear los favoritos (opcional)
    resetFavourites: (state) => {
      state.data = [];
      saveFavouritesToLocalStorage([]);
    }
  },
  extraReducers: (builder) => {
    // Casos para manejar el estado de la operación asincrónica (si los hay)
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

// Acciones exportadas
export const { toggleFavourite, resetFavourites } = favouritesSlice.actions;

// Selectores para acceder a los favoritos
export const getFavourites = (state) => state.favourites.data;
export const getFavouritesStatus = (state) => state.favourites.status;
export const getFavouritesError = (state) => state.favourites.error;

export const favouritesReducer = favouritesSlice.reducer;


