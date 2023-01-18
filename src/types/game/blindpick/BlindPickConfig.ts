import { CharacterMetadataId, PlayerId } from "../../typeAliases";

export interface BlindPickConfig {
  playersPicking: PlayerId[];
  availableCharacters: Set<CharacterMetadataId>;
  numberOfCharactersPerPlayer: number;
}
