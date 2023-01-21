import { PickType } from "../game/PickType";
import { ClockConfig } from "../game/ClockConfig";

export interface Auth {
  token: string;
}

export interface Observe {
  lobbyId: string;
}

export interface GetLobby {
  lobbyId: string;
}

export interface LobbyCreation {
  name: string;
}

export interface LobbyJoin {
  lobbyId: string;
}

export interface LobbyLeave {
  lobbyId: string;
}

export interface SetHexMapName {
  lobbyId: string;
  hexMapName: string;
}

export interface SetNumberOfBans {
  lobbyId: string;
  numberOfBans: number;
}

export interface SetNumberOfCharactersPerPlayer {
  lobbyId: string;
  charactersPerPlayer: number;
}

export interface SetPickType {
  lobbyId: string;
  pickType: PickType;
}

export interface SetLobbyName {
  lobbyId: string;
  newName: string;
}

export interface SetClockConfig {
  lobbyId: string;
  newConfig: ClockConfig;
}

export interface StartGame {
  lobbyId: string;
}
