import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isSetToken: boolean;
}

const initialState: AuthState = {
  isSetToken: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsSetToken: (state, action: PayloadAction<boolean>) => {
      state.isSetToken = action.payload;
    },
  },
});

export const { setIsSetToken } = authSlice.actions;

export const selectAuthInfo = (state: { auth: AuthState }) => state.auth;

export default authSlice.reducer;
