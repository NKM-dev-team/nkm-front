import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import { LOGIN_URL, OAUTH_GOOGLE_LOGIN_URL, REGISTER_URL } from "../app/consts";
import { Login, RegisterRequest } from "../types/login";
import { AuthState } from "../types/authState";
import {
  enqueueNotificationError,
  enqueueNotificationSuccess,
} from "./notificationSlice";

const initialState: AuthState = {
  token: null,
  email: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    authLogout: (state) => {
      state.token = null;
      state.email = null;
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;

export const authenticate =
  ({ email, password }: Login): AppThunk =>
  async (dispatch) => {
    try {
      const result = await axios.post(LOGIN_URL, {
        email: email,
        password: password,
      });
      if (result.status === 200) {
        const token = result.data;
        dispatch(authLogin({ token, email: email }));
        dispatch(enqueueNotificationSuccess("Logged in successfully"));
      }
    } catch (error) {
      console.warn(error);
      dispatch(
        enqueueNotificationError(
          "Unable to log in. Please check credentials and internet connection."
        )
      );
    }
  };

export const authenticateOauthGoogle =
  (email: string, googleCredential: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await axios.post(OAUTH_GOOGLE_LOGIN_URL, googleCredential);
      if (result.status === 200) {
        const token = result.data;
        dispatch(authLogin({ token, email: email }));
        dispatch(enqueueNotificationSuccess("Logged in successfully"));
      }
    } catch (error) {
      console.warn(error);
      dispatch(
        enqueueNotificationError(
          "Unable to log in. Please check internet connection."
        )
      );
    }
  };

export const registerUser =
  (registerRequest: RegisterRequest): AppThunk =>
  async (dispatch) => {
    try {
      const result = await axios.post(REGISTER_URL, registerRequest);
      if (result.status === 201) {
        dispatch(enqueueNotificationSuccess("Registered successfully"));
      } else {
        enqueueNotificationError(
          "Unable to register. Failed with status code " + result.status
        );
      }
    } catch (error) {
      console.warn(error);
      dispatch(
        enqueueNotificationError(
          "Unable to register. Please check credentials and internet connection."
        )
      );
    }
  };

export default authSlice.reducer;
