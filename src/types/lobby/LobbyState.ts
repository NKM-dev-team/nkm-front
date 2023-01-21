import { PickType } from "../game/PickType";
import { ClockConfig } from "../game/ClockConfig";

export interface LobbyState {
  id: string;
  name: string | null;
  hostUserId: string | null;
  creationDate: string | null;
  chosenHexMapName: string | null;
  userIds: string[];
  pickType: PickType;
  numberOfCharactersPerPlayer: number;
  numberOfBans: number;
  clockConfig: ClockConfig;
  gameStarted: boolean;
}
