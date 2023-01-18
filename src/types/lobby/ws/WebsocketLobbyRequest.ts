import { LobbyRoute } from "./LobbyRoute";

export interface WebsocketLobbyRequest {
  requestPath: LobbyRoute;
  requestJson: string;
}
