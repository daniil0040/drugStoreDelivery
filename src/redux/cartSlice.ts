import { CartMedicine, Medicine } from '@/types/MedicineType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TCartState = {
  cartItems: CartMedicine[];
};

const initialState: TCartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<Medicine>) => {
      if (state.cartItems.some(item => item.id === payload.id)) {
        state.cartItems = state.cartItems.map(item => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        state.cartItems.push({ ...payload, quantity: 1 });
      }
    },
    removeSingleItem: () => {},
    decreaseQuantity: () => {},

    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
