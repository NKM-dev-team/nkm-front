import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState } from "../app/store";
import { enqueueNotificationError } from "./notificationSlice";
import { CharacterEffectMetadata } from "../types/game/character_effect/CharacterEffectMetadata";
import { getNkmApi } from "../app/useNkmApi";

interface CharacterEffectMetadatasState {
  initialized: boolean;
  characterEffectMetadatas: CharacterEffectMetadata[];
}

const initialState: CharacterEffectMetadatasState = {
  initialized: false,
  characterEffectMetadatas: [],
};

export const characterEffectsSlice = createSlice({
  name: "character_effects",
  initialState,
  reducers: {
    setCharacterEffectMetadatas: (
      state,
      action: PayloadAction<CharacterEffectMetadata[]>
    ) => {
      state.initialized = true;
      state.characterEffectMetadatas = action.payload;
    },
  },
});

export const { setCharacterEffectMetadatas } = characterEffectsSlice.actions;

export const getCharacterEffectMetadatas =
  (): AppThunk => async (dispatch, getState) => {
    const state: RootState = getState();
    const { CHARACTER_EFFECTS_URL } = getNkmApi(state.settingsData.apiVersion);
    try {
      const result = await axios.get(CHARACTER_EFFECTS_URL);
      if (Array.isArray(result.data)) {
        dispatch(setCharacterEffectMetadatas(result.data));
      } else {
        dispatch(
          enqueueNotificationError(
            "Internal error with character effects download"
          )
        );
      }
    } catch (error) {
      dispatch(
        enqueueNotificationError("Unable to download character effects")
      );
      console.warn(error);
    }
  };

export default characterEffectsSlice.reducer;
