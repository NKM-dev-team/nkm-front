import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/store";
import { GET_LOBBIES_URL } from "../app/consts";

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

export default lobbiesSlice.reducer;
