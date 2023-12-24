import { PickType } from "../game/PickType";
import { ClockConfig } from "../game/ClockConfig";
import { UserId } from "../typeAliases";
import { NkmColor } from "../game/NkmColor";

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
  playerColors: { [key: UserId]: NkmColor };
  gameStarted: boolean;
}
