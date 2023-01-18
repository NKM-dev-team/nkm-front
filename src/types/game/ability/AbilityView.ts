import { BlindPickConfig } from "../blindpick/BlindPickConfig";
import { HexCoordinates } from "../hex/HexCoordinates";
import { AbilityId, AbilityMetadataId, CharacterId } from "../../typeAliases";
import { AbilityState } from "./AbilityState";

export interface AbilityView {
  id: AbilityId;
  metadataId: AbilityMetadataId;
  parentCharacterId: CharacterId;
  state: AbilityState;
  rangeCellCoords: Set<HexCoordinates>;
  targetsInRange: Set<HexCoordinates>;
  canBeUsed: boolean;
  canBeUsedFailureMessage: string | null;
  config: BlindPickConfig;
}
