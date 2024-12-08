import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0, // Field to store total quantity
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.totalQuantity += 1; // Increment total quantity
    },
    removeItem: (state, action) => {
      const item = state.items.find(item => item.name === action.payload.name);
      if (item) {
        state.totalQuantity -= item.quantity; // Decrease total quantity
        state.items = state.items.filter(i => i.name !== item.name);
      }
    },
    updateQuantity: (state, action) => {
      const { product, newQuantity } = action.payload;
      const item = state.items.find(item => item.name === product.name);
      if (item) {
        state.totalQuantity += newQuantity - item.quantity; // Update total quantity
        item.quantity = newQuantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
