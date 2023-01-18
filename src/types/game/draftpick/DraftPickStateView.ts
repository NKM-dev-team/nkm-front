import { CharacterMetadataId, PlayerId } from "../../typeAliases";
import { DraftPickConfig } from "./DraftPickConfig";
import { DraftPickPhase } from "./DraftPickPhase";

export interface DraftPickStateView {
  config: DraftPickConfig;
  bans: { [key: PlayerId]: Set<CharacterMetadataId> | null };
  characterSelection: { [key: PlayerId]: CharacterMetadataId[] };
  bannedCharacters: Set<CharacterMetadataId>;
  pickedCharacters: Set<CharacterMetadataId>;
  charactersAvailableToPick: Set<CharacterMetadataId>;
  currentPlayerPicking: PlayerId | null;
  pickPhase: DraftPickPhase;
}
