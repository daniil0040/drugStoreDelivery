import { TModalIds } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TModalWindowState = {
  isUserSettingsModalOpen: boolean;
  isCancelOrderWarningModalOpen: boolean;
  isGuestSubmitCartModalOpen: boolean;
};

const initialState: TModalWindowState = {
  isUserSettingsModalOpen: false,
  isCancelOrderWarningModalOpen: false,
  isGuestSubmitCartModalOpen: false,
};

const modalWindowSlice = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {
    openModalWindow: (state, action: PayloadAction<TModalIds>) => {
      if (action.payload === 'user-settings-modal') {
        state.isUserSettingsModalOpen = true;
      }
      if (action.payload === 'cancel-order-warning-modal') {
        state.isCancelOrderWarningModalOpen = true;
      }
      if (action.payload === 'guest-submit-cart-modal') {
        state.isGuestSubmitCartModalOpen = true;
      }
    },

    closeModalWindow: (state, action: PayloadAction<TModalIds>) => {
      if (action.payload === 'user-settings-modal') {
        state.isUserSettingsModalOpen = false;
      }
      if (action.payload === 'cancel-order-warning-modal') {
        state.isCancelOrderWarningModalOpen = false;
      }
      if (action.payload === 'guest-submit-cart-modal') {
        state.isGuestSubmitCartModalOpen = false;
      }
    },
  },
});

export const modalWindowReducer = modalWindowSlice.reducer;
export const { openModalWindow, closeModalWindow } = modalWindowSlice.actions;
