import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import axios from "axios";
import { CREATE_BUG_REPORT_URL } from "../app/consts";
import { GameId } from "../types/typeAliases";
import {
  enqueueNotificationError,
  enqueueNotificationSuccess,
} from "./notificationSlice";

export const postLoggedInData =
  (
    url: string,
    data: any,
    successStatus: number,
    onSuccess: (dispatch: ThunkDispatch<any, unknown, Action<string>>) => void,
    onFailure: (
      dispatch: ThunkDispatch<any, unknown, Action<string>>,
      error: any
    ) => void
  ): AppThunk =>
  async (dispatch, getState) => {
    try {
      const result = await axios.post(url, data, {
        headers: {
          Authorization: "Bearer " + getState().authData.token,
        },
      });
      if (result.status === successStatus) {
        onSuccess(dispatch);
      }
    } catch (error) {
      onFailure(dispatch, error);
    }
  };

export const postBugReportCreate =
  (description: string, gameId: GameId | null): AppThunk =>
  async (dispatch, getState) => {
    const isLoggedIn = getState().authData.token !== null;

    const config = isLoggedIn
      ? {
          headers: {
            Authorization: "Bearer " + getState().authData.token,
          },
        }
      : {};

    axios
      .post(
        CREATE_BUG_REPORT_URL,
        {
          description: description + "\n\n Sent from nkm-front web UI.",
          gameId: gameId,
        },
        config
      )
      .then((response) => {
        if (response.status === 201) {
          dispatch(enqueueNotificationSuccess("Bug report created"));
        }
      })
      .catch((error) => {
        console.warn(error);
        dispatch(
          enqueueNotificationError(
            "Unable to create a bug report. Please check server status and internet connection."
          )
        );
      });
  };
