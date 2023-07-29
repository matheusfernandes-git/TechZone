import { createSlice } from "@reduxjs/toolkit";
import { getCartFromLocalStorage } from "utils/cartItems";

//o estado inicial será os itens que foram guardados no localStorage, na página cart.
const initialState = getCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeCart: (state, { payload }) => {
      const haveItem = state.some((item) => item.id === payload);
      if (!haveItem)
        return [
          ...state, //Adiciona item no carrinho
          {
            id: payload,
            amount: 1,
          },
        ];
      return state.filter((item) => item.id !== payload);
    },
    changeAmount: (state, { payload }) => {
      state.map((itemInCart) => {
        if (itemInCart.id === payload.id) itemInCart.amount += payload.amount;
        return itemInCart;
      });
    },
    deleteCartItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload);
      state.splice(index, 1);
    },
    resetCart: () => [],
  },
});

export const { changeCart, changeAmount, resetCart, deleteCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
