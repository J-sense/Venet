import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

export interface IUser {
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  image: string | null;
  address1: string | null;
  phone1: string | null;
}

export interface AuthState {
  user: IUser | null;
  token: string | null;
  refresh: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refresh: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: IUser;
        token: string;
        refresh?: string;
      }>
    ) => {
      const { user, token, refresh } = action.payload;
      state.user = user;
      state.token = token;
      state.refresh = refresh || null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refresh = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
