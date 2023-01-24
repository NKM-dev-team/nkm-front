import { CharacterId } from "../typeAliases";
import { VictoryStatus } from "./VictoryStatus";

export interface Player {
  name: string;
  characterIds: Set<CharacterId>;
  victoryStatus: VictoryStatus;
  isHost: boolean;
}
