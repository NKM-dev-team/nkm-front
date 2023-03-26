import { CharacterId } from "../../typeAliases";
import { HexCellType } from "./HexCellType";
import { HexCoordinates } from "./HexCoordinates";
export interface HexCellEffect {
  cooldown: number;
}

export interface HexCellView {
  cellType: HexCellType;
  coordinates: HexCoordinates;
  characterId: CharacterId | null;
  effects: HexCellEffect[];
  spawnNumber: number | null;
}
