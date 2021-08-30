import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import { GET_GAME_STATE_URL, PLACE_CHARACTER_URL } from "../app/consts";
import { PickType } from "../types/PickType";
import { HexMap } from "./hexMapSlice";
import { PlaceCharacterRequest } from "../types/requests/game";
import {
  enqueueNotificationError,
  enqueueNotificationSuccess,
} from "./notificationSlice";
import { postLoggedInData } from "./helper";

export interface Phase {
  number: number;
}

export interface Turn {
  number: number;
}

export interface NKMCharacter {
  id: string;
  metadataId: string;
  state: NKMCharacterState;
}

export interface NKMCharacterState {
  name: string;
  healthPoints: number;
  attackPoints: number;
  basicAttackRange: number;
  speed: number;
  psychicalDefense: number;
  magicalDefense: number;
}

export interface Player {
  name: string;
  characters: NKMCharacter[];
}

export enum GamePhase {
  NotStarted = "NotStarted",
  CharacterPick = "CharacterPick",
  CharacterPlacing = "CharacterPlacing",
  Running = "Running",
  Finished = "Finished",
}

export interface GameState {
  id: string;
  hexMap: HexMap | null;
  characterIdsOutsideMap: string[];
  phase: Phase;
  turn: Turn;
  players: Player[];
  gamePhase: GamePhase;
  pickType: PickType;
  numberOfBans: number;
  numberOfCharactersPerPlayer: number;
}

interface GamesState {
  gameList: GameState[];
}

const initialState: GamesState = {
  gameList: [],
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    updateGameState: (state, action: PayloadAction<GameState>) => {
      const gameState = action.payload;
      state.gameList = state.gameList
        .filter((g) => g.id !== gameState.id)
        .concat(gameState);
    },
  },
});

export const { updateGameState } = gamesSlice.actions;

export const getGameState = (lobbyId: string): AppThunk => async (dispatch) => {
  try {
    const result = await axios.get(GET_GAME_STATE_URL(lobbyId));
    let gameState = result.data;
    dispatch(updateGameState(gameState));
  } catch (error) {
    console.warn(error);
  }
};

export default gamesSlice.reducer;

const gameModificationRequest = (
  url: string,
  request: any,
  successMessage: string,
  failureMessage: string
): AppThunk =>
  postLoggedInData(
    url,
    request,
    200,
    (dispatch) => {
      dispatch(getGameState(request.gameId));
      dispatch(enqueueNotificationSuccess(successMessage));
    },
    (dispatch, error) => {
      console.warn(error);
      dispatch(enqueueNotificationError(failureMessage));
    }
  );

export const placeCharacter = (request: PlaceCharacterRequest): AppThunk =>
  gameModificationRequest(
    PLACE_CHARACTER_URL,
    request,
    "Character placed successfully",
    "Unable to place the character"
  );
