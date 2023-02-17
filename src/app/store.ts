import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import abilitiesReducer from "../features/abilitiesSlice";
import authReducer from "../features/authSlice";
import characterEffectsReducer from "../features/characterEffectsSlice";
import charactersReducer from "../features/charactersSlice";
import hexMapReducer from "../features/hexMapSlice";
import lobbiesReducer from "../features/lobbiesSlice";
import notificationReducer from "../features/notificationSlice";
import versionReducer from "../features/versionSlice";
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
  abilitiesData: abilitiesReducer,
  authData: authReducer,
  characterEffectsData: characterEffectsReducer,
  charactersData: charactersReducer,
  hexMapData: hexMapReducer,
  lobbiesData: lobbiesReducer,
  notificationData: notificationReducer,
  versionData: versionReducer,
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
