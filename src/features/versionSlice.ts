import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState } from "../app/store";
import {
  enqueueNotificationError,
  enqueueNotificationInfo,
} from "./notificationSlice";
// import { getAllLobbies } from "./lobbiesSlice";
import { getMapsAll } from "./hexMapSlice";
import { getCharacterMetadataAll } from "./charactersSlice";
import { getAbilityMetadatas } from "./abilitiesSlice";
import { getCharacterEffectMetadatas } from "./characterEffectsSlice";
import { getNkmApi } from "../app/useNkmApi";

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
    updateVersion: (state, action: PayloadAction<string>) => {
      state.version = action.payload;
    },
  },
});

export const { updateVersion } = versionSlice.actions;

export const updateVersionIfNewer =
  (): AppThunk => async (dispatch, getState) => {
    const state: RootState = getState();
    const { VERSION_URL } = getNkmApi(state.settingsData.apiVersion);

    try {
      const result = await axios.get(VERSION_URL);
      const newVersion = result.data;
      if (newVersion !== getState().versionData.version) {
        localStorage.clear();
        dispatch(updateVersion(newVersion));
        dispatch(getMapsAll());
        dispatch(getCharacterMetadataAll());
        dispatch(getAbilityMetadatas());
        dispatch(getCharacterEffectMetadatas());
        dispatch(
          enqueueNotificationInfo("New version detected, downloading data...")
        );
      }
    } catch (error) {
      dispatch(enqueueNotificationError("Unable to detect a version"));
      console.warn(error);
    }
  };

export default versionSlice.reducer;
