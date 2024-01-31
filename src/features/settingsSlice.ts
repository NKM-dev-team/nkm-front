import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ApiVersion {
  Latest = "latest",
  Stable = "stable",
  Local = "local",
}

interface SettingsState {
  apiVersion: ApiVersion;
}

const initialState: SettingsState = {
  apiVersion: ApiVersion.Latest, // default value
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setApiVersion: (state, action: PayloadAction<ApiVersion>) => {
      state.apiVersion = action.payload;
    },
  },
});

export const { setApiVersion } = settingsSlice.actions;

export default settingsSlice.reducer;
