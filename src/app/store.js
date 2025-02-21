import { configureStore } from '@reduxjs/toolkit';
import { homeSlice } from '../features/homeSlice';
import { favouritesReducer } from '../features/favouritesSlice';

export const store = configureStore({
    reducer: {
        images: homeSlice.reducer,  
        favourites: favouritesReducer, 
    }
});
