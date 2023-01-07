import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import { CHARACTERS_URL } from "../app/consts";
import {
  enqueueNotificationError,
  enqueueNotificationInfo,
} from "./notificationSlice";

export enum AttackType {
  Melee = "Melee",
  Ranged = "Ranged",
}

export interface CharacterMetadata {
  name: string;
  attackType: AttackType,
  initialHealthPoints: number;
  initialAttackPoints: number;
  initialBasicAttackRange: number;
  initialSpeed: number;
  initialPhysicalDefense: number;
  initialMagicalDefense: number;
  initialAbilitiesMetadataIds: string[];
}
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
