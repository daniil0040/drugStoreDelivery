import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  apiLoginWithEmail,
  apiLoginWithGitHub,
  apiLoginWithGoogle,
  apiSignoutUser,
  apiSignupWithEmail,
  apiVerificationWithPhone,
} from './authOperations';
import { TUser } from '@/types/UserType';

type AuthInitState = {
  authenticated: boolean;
  userData: null | TUser;
  isLoading: boolean;
  isRefreshing: boolean;
};

const initState: AuthInitState = {
  authenticated: false,
  userData: null,
  isLoading: false,
  isRefreshing: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    setAuth: (state, action: PayloadAction<TUser>) => {
      state.authenticated = true;
      state.userData = action.payload;
      state.isLoading = false;
    },
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(apiSignupWithEmail.fulfilled, (state, action) => {
        state.authenticated = true;
        state.userData = action.payload;
        state.isLoading = false;
      })
      .addCase(
        apiLoginWithEmail.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.authenticated = true;
          state.userData = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(apiSignoutUser.fulfilled, state => {
        state.authenticated = false;
        state.userData = null;
        state.isLoading = false;
      })
      .addCase(
        apiLoginWithGitHub.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.authenticated = true;
          state.userData = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(
        apiLoginWithGoogle.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.authenticated = true;
          state.userData = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(
        apiVerificationWithPhone.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.authenticated = true;
          state.userData = action.payload;
          state.isLoading = false;
        },
      )
      .addMatcher(
        isAnyOf(
          apiSignoutUser.pending,
          apiSignupWithEmail.pending,
          apiLoginWithEmail.pending,
          apiLoginWithGitHub.pending,
          apiLoginWithGoogle.pending,
          apiVerificationWithPhone.pending,
        ),
        state => {
          state.isLoading = true;
        },
      )
      .addMatcher(
        isAnyOf(
          apiSignupWithEmail.rejected,
          apiLoginWithEmail.rejected,
          apiSignoutUser.rejected,
          apiLoginWithGoogle.rejected,
          apiLoginWithGitHub.rejected,
          apiVerificationWithPhone.rejected,
        ),
        state => {
          state.isLoading = false;
        },
      ),
});

export const authReducer = authSlice.reducer;
export const { setAuth, setRefreshing } = authSlice.actions;
