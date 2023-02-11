import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("fetchData/getPosts", async () => {
  const response = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  const data = response.map((item) => {
    if (
      ((!item.title.includes("Fjallraven") &&
        item.category === "men's clothing") ||
        item.category === "women's clothing") &&
      (item.category === "men's clothing" ||
        item.category === "women's clothing")
    ) {
      return {
        ...item,
        amount: 1,
        size: "size",
      };
    } else {
      return {
        ...item,
        amount: 1,
      };
    }
  });
  return data;
});

const initialState = {
  fetchData: [],
  loading: "idle",
  error: null,
};

const fetchSlice = createSlice({
  name: "fetchData",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.fetchData = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export default fetchSlice.reducer;
