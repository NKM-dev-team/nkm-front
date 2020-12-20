import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";

export interface HexMap {
  name: string;
  cells: object[];
}

interface HexMapState {
  hexMapList: HexMap[];
}

const initialState: HexMapState = {
  hexMapList: [],
};

export const hexMapSlice = createSlice({
  name: "hexMap",
  initialState,
  reducers: {
    setHexMapList: (state, action: PayloadAction<HexMap[]>) => {
      state.hexMapList = action.payload;
    },
  },
});

export const { setHexMapList } = hexMapSlice.actions;

const MAPS_API_URL = "https://krzysztofruczkowski.pl:8080/api/maps";
export const getMailsAll = (): AppThunk => async (dispatch) => {
  console.log("fetch started");
  try {
    const result = await axios.get(MAPS_API_URL);
    if (Array.isArray(result.data)) {
      let mails = result.data;
      dispatch(setHexMapList(mails));
      console.log(mails);
    } else {
      console.warn(result.data);
    }
  } catch (error) {
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
