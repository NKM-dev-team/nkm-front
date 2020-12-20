import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import hexMapReducer from "../features/hexMapSlice";

export const store = configureStore({
  reducer: {
    hexMapData: hexMapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
