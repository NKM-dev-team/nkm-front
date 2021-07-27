import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import { LOGIN_URL, REGISTER_URL } from "../app/consts";
import { Login, RegisterRequest } from "../types/login";
import { AuthState } from "../types/authState";
import {
  enqueueNotificationError,
  enqueueNotificationSuccess,
  notificationSlice,
} from "./notificationSlice";

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

// export const registerUser = ({ login, email, password }: RegisterRequest): AppThunk => async (
export const registerUser = (
  registerRequest: RegisterRequest
): AppThunk => async (dispatch) => {
  try {
    // const result = await axios.post(REGISTER_URL, {
    //   login: login,
    //   password: password,
    // });

    const result = await axios.post(REGISTER_URL, registerRequest);
    if (result.status === 201) {
      console.log("Registered");
      dispatch(enqueueNotificationSuccess("Registered successfully"));
    } else {
      console.log("Not registered");
      console.log(result.status);
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
