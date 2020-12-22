import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import { LOGIN_URL } from "../app/consts";
import { Login } from "../types/login";
import { AuthState } from "../types/authState";

const initialState: AuthState = {
  token: null,
  login: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.login = action.payload.login;
    },
    authLogout: (state) => {
      state.token = null;
      state.login = null;
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;

export const authenticate = ({ login, password }: Login): AppThunk => async (
  dispatch
) => {
  try {
    const result = await axios.post(LOGIN_URL, {
      login: login,
      password: password,
    });
    if (result.status === 200) {
      const token = result.data;
      dispatch(authLogin({ token, login }));
    }
  } catch (error) {
    console.warn(error);
  }
};

export default authSlice.reducer;
