import { CartMedicine, Medicine } from '@/types/MedicineType';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import type { PayloadAction } from '@reduxjs/toolkit';

export type TCartState = {
  cartItems: CartMedicine[];
  address: string;
};

const initialState: TCartState = {
  cartItems: [],
  address: '',
};

const persistConfig = {
  key: 'cartItems',
  storage,
  whitelist: ['cartItems'],
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
    removeSingleItem: (state, { payload }: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(item => {
        return item.id !== payload;
      });
    },
    decreaseQuantity: (state, { payload }: PayloadAction<number>) => {
      const isLastItem = state.cartItems.some(item => {
        if (item.id === payload) {
          return item.quantity === 1;
        }
        return false;
      });

      if (isLastItem) {
        state.cartItems = state.cartItems.filter(item => {
          return item.id !== payload;
        });
      } else {
        state.cartItems = state.cartItems.map(item => {
          if (item.id !== payload) {
            return item;
          }
          return { ...item, quantity: item.quantity - 1 };
        });
      }
    },

    setCustomerAddress: (state, { payload }: PayloadAction<string>) => {
      state.address = payload;
    },

    resetCustomerAddress: state => {
      state.address = '';
    },
  },
});

export const cartReducer = persistReducer(persistConfig, cartSlice.reducer);
// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeSingleItem,
  decreaseQuantity,
  setCustomerAddress,
  resetCustomerAddress,
} = cartSlice.actions;
