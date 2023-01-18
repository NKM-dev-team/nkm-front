import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import { GET_GAME_STATE_URL } from "../app/consts";
import { GameStateView } from "../types/game/GameStateView";

interface GamesState {
  gameList: GameStateView[];
}

const initialState: GamesState = {
  gameList: [],
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    updateGameState: (state, action: PayloadAction<GameStateView>) => {
      const gameState = action.payload;
      state.gameList = state.gameList
        .filter((g) => g.id !== gameState.id)
        .concat(gameState);
    },
  },
});

export const { updateGameState } = gamesSlice.actions;

export const getGameState =
  (lobbyId: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await axios.get(GET_GAME_STATE_URL(lobbyId));
      let gameState = result.data;
      dispatch(updateGameState(gameState));
    } catch (error) {
      console.warn(error);
    }
  };

export default gamesSlice.reducer;
//
// const gameModificationRequest = (
//   url: string,
//   request: any,
//   successMessage: string,
//   failureMessage: string
// ): AppThunk =>
//   postLoggedInData(
//     url,
//     request,
//     200,
//     (dispatch) => {
//       dispatch(getGameState(request.gameId));
//       dispatch(enqueueNotificationSuccess(successMessage));
//     },
//     (dispatch, error) => {
//       console.warn(error);
//       dispatch(enqueueNotificationError(failureMessage));
//     }
//   );
//
// export const placeCharacter = (request: PlaceCharacterRequest): AppThunk =>
//   gameModificationRequest(
//     PLACE_CHARACTER_URL,
//     request,
//     "Character placed successfully",
//     "Unable to place the character"
//   );
