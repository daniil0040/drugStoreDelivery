import { RootState } from '../store';

export const selectUserOrders = (state: RootState) => state.orders.orders;

export const selectOrdersError = (state: RootState) => state.orders.isError;

export const selectOrdersLoading = (state: RootState) => state.orders.isLoading;
