import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import {VERSION_URL} from "../app/consts";
import {
  enqueueNotificationError,
  enqueueNotificationInfo,
} from "./notificationSlice";
import {getAllLobbies} from "./lobbiesSlice";
import {getMapsAll} from "./hexMapSlice";
import {getCharacterMetadataAll} from "./charactersSlice";
import {getAbilityMetadatas} from "./abilitiesSlice";

interface VersionState {
  version: string;
}

const initialState: VersionState = {
  version: "",
};

export const versionSlice = createSlice({
  name: "version",
  initialState,
  reducers: {
    updateVersion: (
      state,
      action: PayloadAction<string>
    ) => {
      state.version = action.payload;
    },
  },
});

export const { updateVersion } = versionSlice.actions;

export const updateVersionIfNewer = (): AppThunk => async (dispatch, getState) => {
  try {
    const result = await axios.get(VERSION_URL);
    const newVersion = result.data;
    if(newVersion !== getState().versionData.version) {
      dispatch(updateVersion(newVersion));
      dispatch(getAllLobbies());
      dispatch(getMapsAll());
      dispatch(getCharacterMetadataAll());
      dispatch(getAbilityMetadatas());
      dispatch(enqueueNotificationInfo("New version detected"));
    }
  } catch (error) {
    dispatch(enqueueNotificationError("Unable to detect a version"));
    console.warn(error);
  }
};

export default versionSlice.reducer;
