import { GameRoute } from "./GameRoute";

export interface WebsocketGameRequest {
  requestPath: GameRoute;
  requestJson: string;
}
