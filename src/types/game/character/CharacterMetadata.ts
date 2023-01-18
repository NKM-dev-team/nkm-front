import { AttackType } from "./AttackType";

export interface CharacterMetadata {
  name: string;
  attackType: AttackType;
  initialHealthPoints: number;
  initialAttackPoints: number;
  initialBasicAttackRange: number;
  initialSpeed: number;
  initialPhysicalDefense: number;
  initialMagicalDefense: number;
  initialAbilitiesMetadataIds: string[];
}
