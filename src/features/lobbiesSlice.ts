import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import {
  CREATE_LOBBY_URL,
  GET_LOBBIES_URL,
  GET_LOBBY_URL,
  JOIN_LOBBY_URL,
  LEAVE_LOBBY_URL,
} from "../app/consts";
import {
  LobbyCreationRequest,
  LobbyJoinRequest,
  LobbyLeaveRequest,
} from "../types/lobby";
import {
  enqueueNotificationError,
  enqueueNotificationSuccess,
} from "./notificationSlice";

export interface LobbyState {
  id: string;
  name: string | null;
  hostUserId: string | null;
  creationDate: Date | null;
  userIds: string[];
}

interface LobbiesState {
  lobbyList: LobbyState[];
}

const initialState: LobbiesState = {
  lobbyList: [],
};

export const lobbiesSlice = createSlice({
  name: "lobbies",
  initialState,
  reducers: {
    setLobbyList: (state, action: PayloadAction<LobbyState[]>) => {
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
