import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import axios from "axios";

export const postLoggedInData = (
  url: string,
  data: any,
  successStatus: number,
  onSuccess: (dispatch: ThunkDispatch<any, unknown, Action<string>>) => void,
  onFailure: (
    dispatch: ThunkDispatch<any, unknown, Action<string>>,
    error: any
  ) => void
): AppThunk => async (dispatch, getState) => {
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
