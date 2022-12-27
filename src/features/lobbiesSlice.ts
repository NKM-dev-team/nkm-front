import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import {
  CREATE_LOBBY_URL,
  GET_LOBBIES_URL,
  GET_LOBBY_URL,
  JOIN_LOBBY_URL,
  LEAVE_LOBBY_URL,
  SET_HEXMAP_URL,
  SET_NUMBER_OF_BANS_URL,
  SET_NUMBER_OF_CHARACTERS_URL,
  SET_PICK_TYPE_URL,
  START_GAME_URL,
} from "../app/consts";
import {
  LobbyCreationRequest,
  LobbyJoinRequest,
  LobbyLeaveRequest,
  SetHexMapNameRequest,
  SetNumberOfBansRequest,
  SetNumberOfCharactersPerPlayerRequest,
  SetPickTypeRequest,
  StartGameRequest,
} from "../types/requests/lobby";
import {
  enqueueNotificationError,
  enqueueNotificationSuccess,
} from "./notificationSlice";
import { PickType } from "../types/PickType";
import { postLoggedInData } from "./helper";

export interface LobbyState {
  id: string;
  name: string | null;
  hostUserId: string | null;
  creationDate: Date | null;
  chosenHexMapName: string | null;
  userIds: string[];
  pickType: PickType;
  numberOfCharactersPerPlayer: number;
  numberOfBans: number;
}

interface LobbiesState {
  initialized: boolean;
  lobbyList: LobbyState[];
}

const initialState: LobbiesState = {
  initialized: false,
  lobbyList: [],
};

export const lobbiesSlice = createSlice({
  name: "lobbies",
  initialState,
  reducers: {
    setLobbyList: (state, action: PayloadAction<LobbyState[]>) => {
      state.initialized = true;
      state.lobbyList = action.payload;
    },
  },
});

export const { setLobbyList } = lobbiesSlice.actions;

export const getAllLobbies = (): AppThunk => async (dispatch) => {
  try {
    const result = await axios.get(GET_LOBBIES_URL);
    if (Array.isArray(result.data)) {
      let lobbies = result.data;
      dispatch(setLobbyList(lobbies));
    } else {
      console.warn(result.data);
    }
  } catch (error) {
    console.warn(error);
  }
};

export const getLobby = (lobbyId: string): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const result = await axios.get(GET_LOBBY_URL(lobbyId));
    let lobbyState = result.data;
    let updatedLobbyList = getState()
      .lobbiesData.lobbyList.filter((l) => l.id !== lobbyId)
      .concat(lobbyState);
    dispatch(setLobbyList(updatedLobbyList));
    // TODO: send just one lobby through redux (setLobby or something)
  } catch (error) {
    console.warn(error);
  }
};

export default lobbiesSlice.reducer;

export const createLobby = (request: LobbyCreationRequest): AppThunk =>
  postLoggedInData(
    CREATE_LOBBY_URL,
    request,
    201,
    (dispatch) => {
      dispatch(getAllLobbies());
      dispatch(enqueueNotificationSuccess("Lobby created."));
    },
    (dispatch, error) => {
      console.warn(error);
      dispatch(enqueueNotificationError("Unable to create a lobby."));
    }
  );

const lobbyModificationRequest = (
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
      dispatch(getLobby(request.lobbyId));
      dispatch(enqueueNotificationSuccess(successMessage));
    },
    (dispatch, error) => {
      console.warn(error);
      dispatch(enqueueNotificationError(failureMessage));
    }
  );

export const joinLobby = (request: LobbyJoinRequest): AppThunk =>
  lobbyModificationRequest(
    JOIN_LOBBY_URL,
    request,
    "Joined a lobby.",
    "Unable to join a lobby."
  );

export const leaveLobby = (request: LobbyLeaveRequest): AppThunk =>
  lobbyModificationRequest(
    LEAVE_LOBBY_URL,
    request,
    "Left from a lobby.",
    "Unable to leave from a lobby."
  );

export const setHexMapName = (request: SetHexMapNameRequest): AppThunk =>
  lobbyModificationRequest(
    SET_HEXMAP_URL,
    request,
    "HexMap set successfully.",
    "Unable to set HexMap."
  );

export const setPickType = (request: SetPickTypeRequest): AppThunk =>
  lobbyModificationRequest(
    SET_PICK_TYPE_URL,
    request,
    "PickType set successfully.",
    "Unable to set PickType."
  );

export const setNumberOfCharactersPerPlayer = (
  request: SetNumberOfCharactersPerPlayerRequest
): AppThunk =>
  lobbyModificationRequest(
    SET_NUMBER_OF_CHARACTERS_URL,
    request,
    "Characters per player set successfully.",
    "Unable to set characters per player."
  );

export const setNumberOfBans = (request: SetNumberOfBansRequest): AppThunk =>
  lobbyModificationRequest(
    SET_NUMBER_OF_BANS_URL,
    request,
    "Number of bans set successfully.",
    "Unable to set number of bans."
  );
export const startGame = (request: StartGameRequest): AppThunk =>
  lobbyModificationRequest(
    START_GAME_URL,
    request,
    "Game started successfully",
    "Unable to start the game"
  );
