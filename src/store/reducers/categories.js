import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesService from "services/categories";

export const searchCategories = createAsyncThunk(
  "categorias/buscar",
  categoriesService.search
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(searchCategories.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});

export default categoriesSlice.reducer;
