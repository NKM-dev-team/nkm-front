import {
  CharacterEffectId,
  CharacterEffectMetadataId,
  CharacterId,
} from "../../typeAliases";
import { CharacterEffectState } from "./CharacterEffectState";
import { CharacterEffectType } from "./CharacterEffectType";

export interface CharacterEffectView {
  id: CharacterEffectId;
  metadataId: CharacterEffectMetadataId;
  parentCharacterId: CharacterId;
  state: CharacterEffectState;
  effectType: CharacterEffectType;
}
