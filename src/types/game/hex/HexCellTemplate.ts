import { HexCellType } from "./HexCellType";
import { HexCoordinates } from "./HexCoordinates";

export interface HexCellTemplate {
  coordinates: HexCoordinates;
  cellType: HexCellType;
  spawnNumber: number | null;
}
