import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AuthState } from './types';

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    updateAccessToken(state, action: PayloadAction<string | undefined>) {
      state.accessToken = action.payload;
    },
  },
});

export const authReducer =  persistReducer({
  key: 'rtk:auth',
  storage,
  whitelist: ['accessToken']
}, authSlice.reducer);
