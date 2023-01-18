import { CharacterMetadataId, PlayerId } from "../../typeAliases";
import { BlindPickConfig } from "./BlindPickConfig";
import { BlindPickPhase } from "./BlindPickPhase";

export interface BlindPickStateView {
  config: BlindPickConfig;
  characterSelection: { [key: PlayerId]: Set<CharacterMetadataId> };
  pickPhase: BlindPickPhase;
}
