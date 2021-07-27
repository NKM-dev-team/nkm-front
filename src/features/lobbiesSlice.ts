import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import { CREATE_LOBBY_URL, GET_LOBBIES_URL } from "../app/consts";
import { LobbyCreationRequest } from "../types/lobby";
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

export const createLobby = (request: LobbyCreationRequest): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const result = await axios.post(CREATE_LOBBY_URL, request, {
      headers: {
        Authorization: "Bearer " + getState().authData.token, // TODO: get from state
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

export default lobbiesSlice.reducer;
