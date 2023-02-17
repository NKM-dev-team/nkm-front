import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import { ABILITIES_URL } from "../app/consts";
import { enqueueNotificationError } from "./notificationSlice";
import { AbilityMetadata } from "../types/game/ability/AbilityMetadata";

export enum AbilityType {
  Passive = "Passive",
  Normal = "Normal",
  Ultimate = "Ultimate",
}

interface AbilityMetadatasState {
  initialized: boolean;
  abilityMetadatas: AbilityMetadata[];
}

const initialState: AbilityMetadatasState = {
  initialized: false,
  abilityMetadatas: [],
};

export const abilitiesSlice = createSlice({
  name: "abilities",
  initialState,
  reducers: {
    setAbilityMetadatas: (state, action: PayloadAction<AbilityMetadata[]>) => {
      state.initialized = true;
      state.abilityMetadatas = action.payload;
    },
  },
});

export const { setAbilityMetadatas } = abilitiesSlice.actions;

export const getAbilityMetadatas = (): AppThunk => async (dispatch) => {
  try {
    const result = await axios.get(ABILITIES_URL);
    if (Array.isArray(result.data)) {
      let abilityMetadatas = result.data;
      dispatch(setAbilityMetadatas(abilityMetadatas));
      // dispatch(enqueueNotificationInfo("Abilities downloaded"));
    } else {
      dispatch(
        enqueueNotificationError("Internal error with abilities download")
      );
    }
  } catch (error) {
    dispatch(enqueueNotificationError("Unable to download abilites"));
    console.warn(error);
  }
};

export default abilitiesSlice.reducer;
