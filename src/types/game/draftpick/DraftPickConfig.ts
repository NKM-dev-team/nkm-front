import { CharacterMetadataId, PlayerId } from "../../typeAliases";

export interface DraftPickConfig {
  playersPicking: PlayerId[];
  availableCharacters: Set<CharacterMetadataId>;
  numberOfBansPerPlayer: number;
  numberOfCharactersPerPlayer: number;
}
