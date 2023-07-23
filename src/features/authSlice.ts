import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import { LOGIN_URL, OAUTH_GOOGLE_LOGIN_URL, REGISTER_URL } from "../app/consts";
import { Credentials } from "../types/Credentials";
import { AuthState, RequestStatus } from "../types/authState";
import {
  enqueueNotificationError,
  enqueueNotificationSuccess,
} from "./notificationSlice";
import { RegisterRequest } from "../types/RegisterRequest";

const initialState: AuthState = {
  token: null,
  userState: null,
  registerRequestStatus: RequestStatus.None,
  loginRequestStatus: RequestStatus.None,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.userState = action.payload.userState;
      state.loginRequestStatus = RequestStatus.None;
    },
    authLogout: (state) => {
      state.token = null;
      state.userState = null;
    },
    awaitLoginRequest(state) {
      state.loginRequestStatus = RequestStatus.Awaiting;
    },
    awaitRegisterRequest(state) {
      state.registerRequestStatus = RequestStatus.Awaiting;
    },
    loginRequestFinished(state) {
      state.loginRequestStatus = RequestStatus.None;
    },
    registerRequestFinished(state) {
      state.registerRequestStatus = RequestStatus.None;
    },
  },
});

export const {
  authLogin,
  authLogout,
  awaitLoginRequest,
  awaitRegisterRequest,
  loginRequestFinished,
  registerRequestFinished,
} = authSlice.actions;

export const authenticate =
  ({ email, password }: Credentials): AppThunk =>
  async (dispatch) => {
    dispatch(awaitLoginRequest());

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
        dispatch(loginRequestFinished());
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
    dispatch(awaitLoginRequest());
    axios
      .post(OAUTH_GOOGLE_LOGIN_URL, googleCredential)
      .then((response) => {
        if (response.status === 200) {
          dispatch(authLogin(response.data));
          dispatch(enqueueNotificationSuccess("Logged in successfully"));
        }
      })
      .catch((error) => {
        console.warn(error);
        dispatch(loginRequestFinished());
        dispatch(
          enqueueNotificationError(
            "Unable to login. Please check server status and internet connection."
          )
        );
      });
  };

export const registerUser =
  (registerRequest: RegisterRequest): AppThunk =>
  async (dispatch) => {
    dispatch(awaitRegisterRequest());
    axios
      .post(REGISTER_URL, registerRequest)
      .then((response) => {
        if (response.status === 201) {
          dispatch(registerRequestFinished());
          dispatch(enqueueNotificationSuccess("Registered successfully"));
        } else {
          dispatch(registerRequestFinished());
          enqueueNotificationError(
            "Unable to register. Finished with status code " + response.status
          );
        }
      })
      .catch((error) => {
        dispatch(registerRequestFinished());
        if (error.response.status === 409) {
          dispatch(
            enqueueNotificationError("This email is already registered.")
          );
        } else {
          console.warn(error);
          dispatch(
            enqueueNotificationError(
              "Unable to register. Please check if the server is up on status page or internet connection."
            )
          );
        }
      });
  };

export default authSlice.reducer;
