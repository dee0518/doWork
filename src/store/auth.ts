import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-unresolved
import { UserInfo } from '../types/auth';

interface authState {
  isLoggedIn: boolean;
  user: UserInfo | null;
}

const initialState: authState = {
  isLoggedIn: false,
  user: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>): void => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>): void => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const authActions = auth.actions;
export default auth;
