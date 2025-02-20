import { createSlice } from '@reduxjs/toolkit';

// Cargar favoritos desde localStorage
const loadFavouritesFromLocalStorage = () => {
    const favourites = localStorage.getItem('favourites');
    return favourites ? JSON.parse(favourites) : [];
};

// Guardar favoritos en localStorage
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
            const image = action.payload;
            const isFavourite = state.data.some(fav => fav.id === image.id);

            if (isFavourite) {
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
