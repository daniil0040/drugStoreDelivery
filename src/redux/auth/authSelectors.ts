import { RootState } from '../store';

export const selectAuthenticated = (state: RootState) =>
  state.auth.authenticated;

export const selectUserData = (state: RootState) => state.auth.userData;

export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
