import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchData: [],
};

const fetchSlice = createSlice({
  name: "fetchData",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.fetchData = [...action.payload];
    },
  }
});

export const {
  getPosts
} = fetchSlice.actions;

export const selectPosts = (state) => state.fetchData;

export default fetchSlice.reducer;
