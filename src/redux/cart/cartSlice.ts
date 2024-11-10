import { CartMedicine, Medicine } from '@/types/MedicineType';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  apiCreateCartForLoggedUser,
  apiUpdateCartForLoggedUser,
} from './cartSlice.operations';

export type TCartState = {
  cartItems: CartMedicine[];
  address: string;
  status: 'idle' | 'success' | 'error' | 'pending';
};

const initialState: TCartState = {
  cartItems: [],
  address: '',
  status: 'idle',
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
    addToCart: (
      state,
      {
        payload,
      }: PayloadAction<
        Pick<Medicine, 'id' | 'medicineTitle' | 'price' | 'pharmacies'>
      >,
    ) => {
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
    removeSingleItem: (state, { payload }: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(item => {
        return item.id !== payload;
      });
    },
    decreaseQuantity: (state, { payload }: PayloadAction<string>) => {
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
    resetCart: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(apiCreateCartForLoggedUser.pending, state => {
        state.status = 'pending';
      })
      .addCase(apiCreateCartForLoggedUser.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.cartItems = action.payload.items;
      })
      .addCase(apiCreateCartForLoggedUser.rejected, state => {
        state.status = 'error';
      })
      .addCase(apiUpdateCartForLoggedUser.pending, state => {
        state.status = 'pending';
      })
      .addCase(apiUpdateCartForLoggedUser.fulfilled, state => {
        state.status = 'success';
      });
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
  resetCart,
} = cartSlice.actions;
