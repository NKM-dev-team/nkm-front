import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import hexMapReducer from "../features/hexMapSlice";
import authReducer from "../features/authSlice";
import lobbiesReducer from "../features/lobbiesSlice";
import notificationReducer from "../features/notificationSlice";
import charactersReducer from "../features/charactersSlice";
import storage from "redux-persist/lib/storage";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
};

const persistedRootReducer = persistCombineReducers(persistConfig, {
  hexMapData: hexMapReducer,
  authData: authReducer,
  lobbiesData: lobbiesReducer,
  notificationData: notificationReducer,
  charactersData: charactersReducer,
});

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
    },
    immutableCheck: false, // as it slows performance
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
