import { TOrder } from '@/types';
import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  changeOrderStatus,
  createOrder,
  getUserOrders,
} from './orderSlice.operations';

type OrdersInitState = {
  orders: TOrder[];
  isError: boolean;
  isLoading: boolean;
};

const initState: OrdersInitState = {
  orders: [],
  isError: false,
  isLoading: false,
};

const ordersSlice = createSlice({
  initialState: initState,
  name: 'orders',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        getUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
          state.isLoading = false;
          state.isError = false;
        },
      )
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.orders = state.orders.map(order => {
          if (order.uid === action.payload.id) {
            return { ...order, deliveryStatus: action.payload.newStatus };
          }
          return order;
        });
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addMatcher(
        isAnyOf(
          getUserOrders.pending,
          changeOrderStatus.pending,
          createOrder.pending,
        ),
        state => {
          state.isLoading = true;
        },
      )
      .addMatcher(
        isAnyOf(
          getUserOrders.rejected,
          changeOrderStatus.rejected,
          createOrder.rejected,
        ),
        state => {
          state.isError = true;
          state.isLoading = false;
        },
      );
  },
});

export const ordersReducer = ordersSlice.reducer;
