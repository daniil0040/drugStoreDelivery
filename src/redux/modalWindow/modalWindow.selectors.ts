import { RootState } from '../store';

export const selectIsUserSettingsModalOpen = (state: RootState) =>
  state.modalWindow.isUserSettingsModalOpen;

export const selectIsCancelOrderWarningModalOpen = (state: RootState) =>
  state.modalWindow.isCancelOrderWarningModalOpen;

export const selectIsGuestSubmitCartModalOpen = (state: RootState) =>
  state.modalWindow.isGuestSubmitCartModalOpen;
