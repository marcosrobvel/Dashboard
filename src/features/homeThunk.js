import { createAsyncThunk } from '@reduxjs/toolkit';

export const homeThunk = createAsyncThunk("images/getImages",async (page = 1, { rejectWithValue }) => {
  try{const res = await fetch(`https://api.unsplash.com/photos/random/?client_id=PRDLhO8teyP59ZiYMX5Ggb2XE-NN9raqWeRZiz7HdTs&count=20`)
  const json = await res.json() 
  return json}

  catch(error){console.log(error)
  return rejectWithValue(error.message);}
})