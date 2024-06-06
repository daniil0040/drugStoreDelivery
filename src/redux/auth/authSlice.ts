import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  apiLoginWithEmail,
  apiSignoutUser,
  apiSignupWithEmail,
  apiSignupWithGoogle,
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
      .addCase(apiSignupWithEmail.pending, state => {
        state.isLoading = true;
      })
      .addCase(apiSignupWithEmail.fulfilled, (state, action) => {
        state.authenticated = true;
        state.userData = action.payload;
        state.isLoading = false;
      })
      .addCase(apiSignupWithEmail.rejected, state => {
        state.isLoading = false;
      })
      .addCase(apiSignupWithGoogle.pending, state => {
        state.isLoading = true;
      })
      .addCase(apiSignupWithGoogle.fulfilled, (state, action) => {
        state.authenticated = true;
        state.userData = action.payload;
        state.isLoading = false;
      })
      .addCase(apiSignupWithGoogle.rejected, state => {
        state.isLoading = false;
      })
      .addCase(apiLoginWithEmail.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        apiLoginWithEmail.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.authenticated = true;
          state.userData = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(apiLoginWithEmail.rejected, state => {
        state.isLoading = false;
      })
      .addCase(apiSignoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(apiSignoutUser.fulfilled, state => {
        state.authenticated = false;
        state.userData = null;
        state.isLoading = false;
      })
      .addCase(apiSignoutUser.rejected, state => {
        state.isLoading = false;
      }),
});

export const authReducer = authSlice.reducer;
export const { setAuth, setRefreshing } = authSlice.actions;
