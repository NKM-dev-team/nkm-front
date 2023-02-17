import { CharacterEffectType } from "./CharacterEffectType";

export interface CharacterEffectMetadata {
  name: string;
  initialEffectType: CharacterEffectType;
  description: string;
  isCc: boolean;
}
