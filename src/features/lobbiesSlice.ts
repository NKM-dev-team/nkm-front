import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import {
  CREATE_LOBBY_URL,
  GET_LOBBIES_URL,
  GET_LOBBY_URL,
  JOIN_LOBBY_URL,
  LEAVE_LOBBY_URL,
  SET_HEXMAP_URL,
  SET_NUMBER_OF_CHARACTERS_URL,
  SET_PICK_TYPE_URL,
} from "../app/consts";
import {
  LobbyCreationRequest,
  LobbyJoinRequest,
  LobbyLeaveRequest,
  SetHexMapNameRequest,
  SetNumberOfCharactersPerPlayerRequest,
  SetPickTypeRequest,
} from "../types/lobby";
import {
  enqueueNotificationError,
  enqueueNotificationSuccess,
} from "./notificationSlice";
import { PickType } from "../types/PickType";

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

export const createLobby = (request: LobbyCreationRequest): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const result = await axios.post(CREATE_LOBBY_URL, request, {
      headers: {
        Authorization: "Bearer " + getState().authData.token,
      },
    });
    if (result.status === 201) {
      dispatch(getAllLobbies());
      dispatch(enqueueNotificationSuccess("Lobby created."));
    }
  } catch (error) {
    console.warn(error);
    dispatch(enqueueNotificationError("Unable to create a lobby."));
  }
};

export const joinLobby = (request: LobbyJoinRequest): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const result = await axios.post(JOIN_LOBBY_URL, request, {
      headers: {
        Authorization: "Bearer " + getState().authData.token,
      },
    });
    if (result.status === 200) {
      dispatch(getLobby(request.lobbyId));
      dispatch(enqueueNotificationSuccess("Joined a lobby."));
    }
  } catch (error) {
    console.warn(error);
    dispatch(enqueueNotificationError("Unable to join a lobby."));
  }
};

export const leaveLobby = (request: LobbyLeaveRequest): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const result = await axios.post(LEAVE_LOBBY_URL, request, {
      headers: {
        Authorization: "Bearer " + getState().authData.token,
      },
    });
    if (result.status === 200) {
      dispatch(getLobby(request.lobbyId));
      dispatch(enqueueNotificationSuccess("Left from a lobby."));
    }
  } catch (error) {
    console.warn(error);
    dispatch(enqueueNotificationError("Unable to leave from a lobby."));
  }
};

export const setHexMapName = (
  request: SetHexMapNameRequest
): AppThunk => async (dispatch, getState) => {
  try {
    const result = await axios.post(SET_HEXMAP_URL, request, {
      headers: {
        Authorization: "Bearer " + getState().authData.token,
      },
    });
    if (result.status === 200) {
      dispatch(getLobby(request.lobbyId));
      dispatch(enqueueNotificationSuccess("HexMap set successfully."));
    }
  } catch (error) {
    console.warn(error);
    dispatch(enqueueNotificationError("Unable to set HexMap."));
  }
};

export const setPickType = (request: SetPickTypeRequest): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const result = await axios.post(SET_PICK_TYPE_URL, request, {
      headers: {
        Authorization: "Bearer " + getState().authData.token,
      },
    });
    if (result.status === 200) {
      dispatch(getLobby(request.lobbyId));
      dispatch(enqueueNotificationSuccess("PickType set successfully."));
    }
  } catch (error) {
    console.warn(error);
    dispatch(enqueueNotificationError("Unable to set PickType."));
  }
};

export const setNumberOfCharactersPerPlayer = (
  request: SetNumberOfCharactersPerPlayerRequest
): AppThunk => async (dispatch, getState) => {
  try {
    const result = await axios.post(SET_NUMBER_OF_CHARACTERS_URL, request, {
      headers: {
        Authorization: "Bearer " + getState().authData.token,
      },
    });
    if (result.status === 200) {
      dispatch(getLobby(request.lobbyId));
      dispatch(
        enqueueNotificationSuccess("Characters per player set successfully.")
      );
    }
  } catch (error) {
    console.warn(error);
    dispatch(enqueueNotificationError("Unable to set characters per player."));
  }
};
