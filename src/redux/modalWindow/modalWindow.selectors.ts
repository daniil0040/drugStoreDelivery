import { RootState } from '../store';

export const selectIsModalOpen = (state: RootState) =>
  state.modalWindow.isModalOpen;
