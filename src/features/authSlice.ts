import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import { LOGIN_URL, OAUTH_GOOGLE_LOGIN_URL, REGISTER_URL } from "../app/consts";
import { Credentials } from "../types/Credentials";
import { AuthState } from "../types/authState";
import {
  enqueueNotificationError,
  enqueueNotificationSuccess,
} from "./notificationSlice";
import { RegisterRequest } from "../types/RegisterRequest";

const initialState: AuthState = {
  token: null,
  userState: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.userState = action.payload.userState;
    },
    authLogout: (state) => {
      state.token = null;
      state.userState = null;
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;

export const authenticate =
  ({ email, password }: Credentials): AppThunk =>
  async (dispatch) => {
    axios
      .post(LOGIN_URL, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(authLogin(response.data));
          dispatch(enqueueNotificationSuccess("Logged in successfully"));
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(
            enqueueNotificationError("Unable to login. " + error.response.data)
          );
        } else {
          console.warn(error);
          dispatch(
            enqueueNotificationError(
              "Unable to login. Please check server status and internet connection."
            )
          );
        }
      });
  };

export const authenticateOauthGoogle =
  (email: string, googleCredential: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await axios.post(OAUTH_GOOGLE_LOGIN_URL, googleCredential);
      if (result.status === 200) {
        dispatch(authLogin(result.data));
        dispatch(enqueueNotificationSuccess("Logged in successfully"));
      }
    } catch (error) {
      console.warn(error);
      dispatch(
        enqueueNotificationError(
          "Unable to login. Please check server status and internet connection."
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
