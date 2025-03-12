import { createAsyncThunk } from '@reduxjs/toolkit';

export const homeThunk = createAsyncThunk("images/getImages",async (params, { rejectWithValue }) => {
  try{
    const searchTerm = params.searchTerm === '' ? null : params.searchTerm
    const imagesPerPage = 30;
    const res = await fetch(`https://api.unsplash.com/search/photos?page=${params.page}&query=${searchTerm}&client_id=PRDLhO8teyP59ZiYMX5Ggb2XE-NN9raqWeRZiz7HdTs&per_page=${imagesPerPage}`)
  
  const json = await res.json() 
  return json}

  catch(error){console.log(error)
  return rejectWithValue(error.message);}
})