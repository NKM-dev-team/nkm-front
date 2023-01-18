import { LobbyResponseType } from "./LobbyResponseType";

export interface WebsocketLobbyResponse {
  lobbyResponseType: LobbyResponseType;
  statusCode: number;
  body: string;
}
