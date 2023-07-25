import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itemsService from "services/items";
import { v4 as uuid } from "uuid";

export const searchItems = createAsyncThunk(
  "itens/buscar",
  itemsService.search
);

const initialState = [];

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    changeFavorite: (state, { payload }) => {
      state.map((item) => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      });
    },
    addNewItem: (state, { payload }) => {
      state.push({ ...payload, id: uuid() });
    },
    deleteItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload);
      state.splice(index, 1);
    },
    changeItem: (state, { payload }) => {
      state.map((item) => {
        if (item.id === payload.id) item.titulo = payload.item.title;
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchItems.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});

export const { changeFavorite, addNewItem, changeItem, deleteItem } =
  itemsSlice.actions;

export default itemsSlice.reducer;
