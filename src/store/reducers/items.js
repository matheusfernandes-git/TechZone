import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itemsService from "services/items";

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
      state.push({ ...payload });
    },
    changeItem: (state, { payload }) => {
      state.map((item) => {
        if (item.id === payload.id) {
          item.titulo = payload.item.title;
          item.preco = payload.item.price;
        }
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

export const { changeFavorite, addNewItem, changeItem } = itemsSlice.actions;

export default itemsSlice.reducer;
