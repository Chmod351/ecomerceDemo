import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingProductIndex = state.products.findIndex(
        (p) => p._id === action.payload._id,
      );

      if (existingProductIndex !== -1) {
        // El producto ya existe en el carrito
        state.products[existingProductIndex].quantity +=
          action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        // El producto no existe en el carrito
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    removeProduct: (state, action) => {
      const existingProductIndex = state.products.findIndex(
        (p) => p._id === action.payload._id,
      );

      if (existingProductIndex !== -1) {
        // El producto existe en el carrito
        const existingProduct = state.products[existingProductIndex];

        if (existingProduct.quantity > 1) {
          // Hay más de una instancia del producto en el carrito
          existingProduct.quantity -= 1;
          state.total -= existingProduct.price;
        } else {
          // Solo hay una instancia del producto en el carrito
          state.quantity -= 1;
          state.products.splice(existingProductIndex, 1);
          state.total -= existingProduct.price;
        }
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
