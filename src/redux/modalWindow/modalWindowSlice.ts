import { createSlice } from '@reduxjs/toolkit';

type TModalWindowState = {
  isModalOpen: boolean;
};

const initialState: TModalWindowState = {
  isModalOpen: false,
};

const modalWindowSlice = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {
    openModalWindow: state => {
      state.isModalOpen = true;
    },

    closeModalWindow: state => {
      state.isModalOpen = false;
    },
  },
});

export const modalWindowReducer = modalWindowSlice.reducer;
export const { openModalWindow, closeModalWindow } = modalWindowSlice.actions;
