import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import { CHARACTERS_URL } from "../app/consts";
import { enqueueNotificationError } from "./notificationSlice";
import { CharacterMetadata } from "../types/game/character/CharacterMetadata";

interface CharactersState {
  initialized: boolean;
  characterMetadataList: CharacterMetadata[];
}

const initialState: CharactersState = {
  initialized: false,
  characterMetadataList: [],
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacterMetadataList: (
      state,
      action: PayloadAction<CharacterMetadata[]>
    ) => {
      state.initialized = true;
      state.characterMetadataList = action.payload;
    },
  },
});

export const { setCharacterMetadataList } = charactersSlice.actions;

export const getCharacterMetadataAll = (): AppThunk => async (dispatch) => {
  try {
    const result = await axios.get(CHARACTERS_URL);
    if (Array.isArray(result.data)) {
      let charactersMetadata = result.data;
      dispatch(setCharacterMetadataList(charactersMetadata));
      // dispatch(enqueueNotificationInfo("Characters downloaded"));
    } else {
      dispatch(
        enqueueNotificationError("Internal error with characters download")
      );
    }
  } catch (error) {
    dispatch(enqueueNotificationError("Unable to download characters"));
    console.warn(error);
  }
};

export default charactersSlice.reducer;
