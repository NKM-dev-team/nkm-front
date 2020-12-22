import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import hexMapReducer from "../features/hexMapSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    hexMapData: hexMapReducer,
    authData: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
