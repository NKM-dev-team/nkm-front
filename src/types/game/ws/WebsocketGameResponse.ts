import { GameResponseType } from "./GameResponseType";

export interface WebsocketGameResponse {
  gameResponseType: GameResponseType;
  statusCode: number;
  body: string;
}
