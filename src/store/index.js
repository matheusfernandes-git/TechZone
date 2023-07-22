import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/categories";
import itemsSlice from "./reducers/items";
import cartSlice from "./reducers/cart";
import searchSlice from "./reducers/search";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    items: itemsSlice,
    cart: cartSlice,
    search: searchSlice,
  },
});

export default store;
