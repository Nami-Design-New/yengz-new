import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
  name: "cart",
  initialState: {
    cartList: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartList = action.payload;
    },

    updateEntireCart: (state, action) => {
      state.cartList = action.payload;
    },
  },
});

export const { addToCart, updateEntireCart } = cart.actions;
export default cart.reducer;
