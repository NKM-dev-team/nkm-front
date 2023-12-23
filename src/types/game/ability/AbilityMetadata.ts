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

export const replaceVariables = (
  str: string,
  vars: { [key: string]: number }
): string => {
  const keys = Object.keys(vars);
  return keys.reduce((acc, currentKey) => {
    const re = new RegExp(`{${currentKey}}`, "g");
    return acc.replace(re, vars[currentKey].toString());
  }, str);
};

export const abilityDescription = (am: AbilityMetadata) =>
  replaceVariables(am.description, am.variables).replaceAll("\n", "<br>");
