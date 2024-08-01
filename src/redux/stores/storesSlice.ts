import { Medicine, Store } from '@/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { apiGetMedicinesByPharmacy, apiGetStores } from './storesOperations';

type TStoresState = {
  stores: Store[];
  isLoading: boolean;
  isError: boolean;
  medicines: Medicine[];
};

const initialState: TStoresState = {
  stores: [],
  isLoading: false,
  isError: false,
  medicines: [],
};

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(apiGetStores.fulfilled, (state, action) => {
        state.stores = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(apiGetMedicinesByPharmacy.fulfilled, (state, action) => {
        state.medicines = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addMatcher(
        isAnyOf(apiGetStores.rejected, apiGetMedicinesByPharmacy.rejected),
        state => {
          state.isError = true;
          state.isLoading = false;
        },
      )
      .addMatcher(
        isAnyOf(apiGetStores.pending, apiGetMedicinesByPharmacy.pending),
        state => {
          state.isLoading = true;
        },
      ),
});

export const storesReducer = storesSlice.reducer;
