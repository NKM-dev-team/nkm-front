import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";
import axios from "axios";
import { BugReportId, GameId, UserId } from "../types/typeAliases";
import {
  enqueueNotificationError,
  enqueueNotificationSuccess,
} from "./notificationSlice";
import { Dispatch } from "react";
import { getNkmApi } from "../app/useNkmApi";

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
    const state: RootState = getState();
    const { CREATE_BUG_REPORT_URL } = getNkmApi(state.settingsData.apiVersion);

    const isLoggedIn = state.authData.token !== null;

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

export interface BugReport {
  id: string;
  creatorIdOpt: UserId | null;
  description: string;
  gameId: GameId | null;
  creationDate: string;
  resolved: boolean;
}

export const fetchBugReports = async (
  state: RootState,
  dispatch: Dispatch<any>
): Promise<BugReport[]> => {
  const { FETCH_BUG_REPORT_URL } = getNkmApi(state.settingsData.apiVersion);

  const isLoggedIn = state.authData.token !== null;

  const config = isLoggedIn
    ? {
        headers: {
          Authorization: "Bearer " + state.authData.token,
        },
      }
    : {};

  return new Promise((resolve, reject) => {
    axios
      .get<BugReport[]>(FETCH_BUG_REPORT_URL, config)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        console.warn(error);
        dispatch(enqueueNotificationError("Unable to fetch bug reports."));
        reject(error);
      });
  });
};

export const setBugReportResolved = async (
  state: RootState,
  dispatch: Dispatch<any>,
  id: BugReportId,
  resolved: boolean
): Promise<void> => {
  const { SET_RESOLVED_BUG_REPORT_URL } = getNkmApi(
    state.settingsData.apiVersion
  );

  const isLoggedIn = state.authData.token !== null;

  const config = isLoggedIn
    ? {
        headers: {
          Authorization: "Bearer " + state.authData.token,
        },
      }
    : {};

  return new Promise((resolve, reject) => {
    axios
      .post(
        SET_RESOLVED_BUG_REPORT_URL,
        {
          id: id,
          resolved: resolved,
        },
        config
      )
      .then((response) => {
        if (response.status === 200) {
          resolve();
        }
      })
      .catch((error) => {
        console.warn(error);
        dispatch(enqueueNotificationError("Unable change resolved status."));
        reject();
      });
  });
};
