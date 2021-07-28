import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import { MAPS_API_URL } from "../app/consts";
import {
  enqueueNotificationError,
  enqueueNotificationInfo,
} from "./notificationSlice";

interface HexCoordinates {
  x: number;
  y: number;
  z: number;
}

export interface HexCell {
  cellType: string;
  coordinates: HexCoordinates;
  effects: object[];
}
export interface HexMap {
  name: string;
  cells: HexCell[];
}

interface HexMapState {
  initialized: boolean;
  hexMapList: HexMap[];
}

const initialState: HexMapState = {
  initialized: false,
  hexMapList: [],
};

export const hexMapSlice = createSlice({
  name: "hexMap",
  initialState,
  reducers: {
    setHexMapList: (state, action: PayloadAction<HexMap[]>) => {
      state.initialized = true;
      state.hexMapList = action.payload;
    },
  },
});

export const { setHexMapList } = hexMapSlice.actions;

export const getMapsAll = (): AppThunk => async (dispatch) => {
  try {
    const result = await axios.get(MAPS_API_URL);
    if (Array.isArray(result.data)) {
      let hexMaps = result.data;
      hexMaps.forEach((h) =>
        h.cells.forEach(
          (c: HexCell) => (c.coordinates.y = -c.coordinates.x - c.coordinates.z)
        )
      );
      dispatch(setHexMapList(hexMaps));
      dispatch(enqueueNotificationInfo("Hex maps downloaded"));
    } else {
      dispatch(
        enqueueNotificationError("Internal error with hex maps download")
      );
    }
  } catch (error) {
    dispatch(enqueueNotificationError("Unable to download hex maps"));
    console.warn(error);
    // dispatch(
    //   enqueueSnackbarError("Nie udało się pobrać maili ze skrzynki " + inbox)
    // );
  }
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export default hexMapSlice.reducer;
