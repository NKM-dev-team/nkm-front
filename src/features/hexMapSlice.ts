import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState } from "../app/store";
import { enqueueNotificationError } from "./notificationSlice";
import { HexMapTemplate } from "../types/game/hex/HexMapTemplate";
import { getNkmApi } from "../app/useNkmApi";

interface HexMapState {
  initialized: boolean;
  hexMapList: HexMapTemplate[];
}

const initialState: HexMapState = {
  initialized: false,
  hexMapList: [],
};

export const hexMapSlice = createSlice({
  name: "hexMap",
  initialState,
  reducers: {
    setHexMapList: (state, action: PayloadAction<HexMapTemplate[]>) => {
      state.initialized = true;
      state.hexMapList = action.payload;
    },
  },
});

export const { setHexMapList } = hexMapSlice.actions;

export const getMapsAll = (): AppThunk => async (dispatch, getState) => {
  const state: RootState = getState();
  const { MAPS_API_URL } = getNkmApi(state.settingsData.apiVersion);

  try {
    const result = await axios.get(MAPS_API_URL);
    if (Array.isArray(result.data)) {
      let hexMaps = result.data;
      dispatch(setHexMapList(hexMaps));
    } else {
      dispatch(
        enqueueNotificationError("Internal error with hex maps download")
      );
    }
  } catch (error) {
    dispatch(enqueueNotificationError("Unable to download hex maps"));
  }
};

export default hexMapSlice.reducer;
