import { HexCoordinates } from "../game/hex/HexCoordinates";

export interface PlaceCharacterRequest {
  gameId: string;
  hexCoordinates: HexCoordinates;
  characterId: string;
}
