import { PickType } from "../PickType";

export interface LobbyCreationRequest {
  name: string;
}
export interface LobbyJoinRequest {
  lobbyId: string;
}
export interface LobbyLeaveRequest {
  lobbyId: string;
}

export interface SetHexMapNameRequest {
  lobbyId: string;
  hexMapName: string;
}

export interface SetNumberOfBansRequest {
  lobbyId: string;
  numberOfBans: number;
}
export interface SetNumberOfCharactersPerPlayerRequest {
  lobbyId: string;
  charactersPerPlayer: number;
}
export interface SetPickTypeRequest {
  lobbyId: string;
  pickType: PickType;
}
export interface StartGameRequest {
  lobbyId: string;
}
