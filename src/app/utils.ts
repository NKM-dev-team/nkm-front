import { EffectCallback, useEffect } from "react";
import { AbilityId, CharacterId } from "../types/typeAliases";
import { NkmCharacterView } from "../types/game/character/NkmCharacterView";
import { GameStateView } from "../types/game/GameStateView";
import { AbilityView } from "../types/game/ability/AbilityView";
// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMountEffect = (fun: EffectCallback) => useEffect(fun, []);

export const characterById = (gameState: GameStateView, id: CharacterId) =>
  Array.from(gameState.characters).find((c) => c.id === id) as NkmCharacterView;

export const abilityById = (gameState: GameStateView, id: AbilityId) =>
  Array.from(gameState.abilities).find((a) => a.id === id) as AbilityView;
