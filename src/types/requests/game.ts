import { HexCoordinates } from "../../features/hexMapSlice";

export interface PlaceCharacterRequest {
  gameId: string;
  hexCoordinates: HexCoordinates;
  characterId: string;
}
