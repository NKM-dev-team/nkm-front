import { EffectCallback, useEffect, useState } from "react";
import { AbilityId, CharacterId } from "../types/typeAliases";
import { NkmCharacterView } from "../types/game/character/NkmCharacterView";
import { GameStateView } from "../types/game/GameStateView";
import { AbilityView } from "../types/game/ability/AbilityView";
import { GameRoute } from "../types/game/ws/GameRoute";
import { WebsocketGameRequest } from "../types/game/ws/WebsocketGameRequest";
import * as _ from "lodash";
import { UseData } from "../types/game/ability/UseData";
import { CharacterMetadata } from "../types/game/character/CharacterMetadata";
import { AttackType } from "../types/game/character/AttackType";
import { AbilityMetadata } from "../types/game/ability/AbilityMetadata";
import { Clock } from "../types/game/Clock";
import { CLOCK_UPDATE_INTERVAL } from "./consts";
// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMountEffect = (fun: EffectCallback) => useEffect(fun, []);

export function useClock(lastClock: Clock, gameState: GameStateView) {
  const [currentClock, setCurrentClock] = useState(lastClock);
  const [lastClockUpdateTimestamp, setLastClockUpdateTimestamp] = useState(
    Date.now()
  );

  useEffect(() => setLastClockUpdateTimestamp(Date.now()), [lastClock]);

  const millisSinceLastClockUpdate = () =>
    Date.now() - lastClockUpdateTimestamp;

  const getCurrentClock = (lastClock: Clock) => {
    if (!lastClock.isRunning) return lastClock;
    const lastClockCopy = _.cloneDeep(lastClock);

    if (lastClock.isSharedTime) {
      lastClockCopy["sharedTime"] = Math.max(
        lastClock.sharedTime - millisSinceLastClockUpdate(),
        0
      );
      return lastClockCopy;
    } else {
      lastClockCopy.playerTimes[gameState.currentPlayerId] = Math.max(
        lastClock.playerTimes[gameState.currentPlayerId] -
          millisSinceLastClockUpdate(),
        0
      );
      return lastClockCopy;
    }
  };

  useEffect(() => {
    const updateCurrentClockRepeatedly = setInterval(() => {
      setCurrentClock(getCurrentClock(lastClock));
    }, CLOCK_UPDATE_INTERVAL);
    return () => {
      clearInterval(updateCurrentClockRepeatedly);
    };
  }, [lastClock]);

  return currentClock;
}

export function toClockTime(millis: number) {
  try {
    return new Date(millis).toISOString().slice(11, -1);
  } catch (e) {
    return "ERROR";
  }
}

export const characterById = (gameState: GameStateView, id: CharacterId) =>
  gameState.characters.find((c) => c.id === id) as NkmCharacterView;

export const abilityById = (gameState: GameStateView, id: AbilityId) =>
  gameState.abilities.find((a) => a.id === id) as AbilityView;

// TODO not so random right now?
export const randomCharacterId = (gameState: GameStateView) =>
  _.head(_.shuffle(gameState.characters.map((c) => c.id))) ?? "undefined";

export const randomAbilityId = (gameState: GameStateView) =>
  _.head(_.shuffle(gameState.abilities.map((c) => c.id))) ?? "undefined";

export const EMPTY_USE_DATA: UseData = { data: "" };

export function routeToWsGameRequest(
  gameState: GameStateView,
  route: GameRoute
): WebsocketGameRequest {
  let json: any = { lobbyId: gameState.id };
  switch (route) {
    case GameRoute.Auth:
      json = { token: "admin_only_request" };
      break;
    case GameRoute.Observe:
      break;
    case GameRoute.GetState:
      break;
    case GameRoute.Pause:
      break;
    case GameRoute.Surrender:
      break;
    case GameRoute.BanCharacters:
      json.characterIds = gameState.charactersMetadata
        .slice(0, gameState.numberOfBans)
        .map((c) => c.name);
      break;
    case GameRoute.PickCharacter:
      json.characterId =
        _.head([gameState.draftPickState?.charactersAvailableToPick]) ??
        _.head(gameState.charactersMetadata.map((c) => c.name)) ??
        "undefined";
      break;
    case GameRoute.BlindPickCharacters:
      json.characterIds = _.take(
        gameState.charactersMetadata,
        gameState.numberOfCharactersPerPlayer
      ).map((m) => m.name);
      break;
    case GameRoute.PlaceCharacters:
      json.coordinatesToCharacterIdMap = "WIP";
      break;
    case GameRoute.EndTurn:
      json.characterId = randomCharacterId(gameState);
      break;
    case GameRoute.PassTurn:
      break;
    case GameRoute.Move:
      json.path = "WIP";
      json.characterId = randomCharacterId(gameState);
      break;
    case GameRoute.BasicAttack:
      json.attackingCharacterId = randomCharacterId(gameState);
      json.targetCharacterId = randomCharacterId(gameState);
      break;
    case GameRoute.UseAbilityWithoutTarget:
      json.abilityId = randomAbilityId(gameState);
      break;
    case GameRoute.UseAbilityOnCoordinates:
      json.abilityId = randomAbilityId(gameState);
      json.target = "WIP";
      json.useData = EMPTY_USE_DATA;
      break;
    case GameRoute.UseAbilityOnCharacter:
      json.abilityId = randomAbilityId(gameState);
      json.target = "WIP";
      json.useData = EMPTY_USE_DATA;
      break;
    case GameRoute.SendChatMessage:
      json.message = "234";
      break;
    case GameRoute.ExecuteCommand:
      json.command = "";
      break;
  }
  return { requestPath: route, requestJson: JSON.stringify(json) };
}

interface StatMapping {
  title: string;
  icon: string;
  value: number | string;
}

export const statMappings = (c: CharacterMetadata): StatMapping[] => [
  {
    title: "Health points",
    icon: "hearts",
    value: c.initialHealthPoints,
  },
  {
    title: `Attack points (${c.attackType})`,
    icon: c.attackType === AttackType.Ranged ? "high-shot" : "gladius",
    value: c.initialAttackPoints,
  },
  {
    title: "Range",
    icon: "arrow-scope",
    value: c.initialBasicAttackRange,
  },
  {
    title: "Speed",
    icon: "wingfoot",
    value: c.initialSpeed,
  },
  {
    title: "Physical defense",
    icon: "shield",
    value: c.initialPhysicalDefense,
  },
  {
    title: "Magical defense",
    icon: "zebra-shield",
    value: c.initialMagicalDefense,
  },
];

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
