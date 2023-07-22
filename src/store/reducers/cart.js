import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

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
      return state.filter((item) => item.id != payload); //remove item do carrinho
    },
    changeAmount: (state, { payload }) => {
      state.map((itemInCart) => {
        if (itemInCart.id === payload.id) itemInCart.amount += payload.amount;
        return itemInCart;
      });
    },
    resetCart: () => [],
  },
});

export const { changeCart, changeAmount, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
