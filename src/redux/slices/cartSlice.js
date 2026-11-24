import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
  },

  reducers: {

    // Add product to cart
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.items.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        if (existingProduct.quantity < product.stock) {
          existingProduct.quantity += 1;
        }
      } else {
        if (product.stock > 0) {
          state.items.push({
            ...product,
            quantity: 1,
          });
        }
      }
    },

    // Increase quantity
    incrementQuantity: (state, action) => {
      const product = state.items.find(
        (item) => item.id === action.payload
      );

      if (product && product.quantity < product.stock) {
        product.quantity += 1;
      }
    },

    // Decrease quantity
    decrementQuantity: (state, action) => {
      const product = state.items.find(
        (item) => item.id === action.payload
      );

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    // Remove individual product
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
    },

  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const increaseQuantity = incrementQuantity;
export const decreaseQuantity = decrementQuantity;

export default cartSlice.reducer;
