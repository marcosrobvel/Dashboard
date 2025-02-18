import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchImages = createAsyncThunk(
  'search/fetchImages',
  async (searchQuery) => {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`);
    const data = await response.json();
    return data.results;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    images: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default searchSlice.reducer;