import { AbilityType } from "../../../features/abilitiesSlice";
import { CharacterEffectId } from "../../typeAliases";

export interface AbilityMetadata {
  name: string;
  abilityType: AbilityType;
  description: string;
  variables: { [key: string]: number };
  alternateName: string;
  relatedEffectIds: CharacterEffectId[];
}
