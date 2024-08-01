import { RootState } from '../store';

export const selectStores = (state: RootState) => state.stores.stores;

export const selectStoresIsError = (state: RootState) => state.stores.isError;

export const selectStoresIsLoading = (state: RootState) =>
  state.stores.isLoading;

export const selectMedicines = (state: RootState) => state.stores.medicines;
