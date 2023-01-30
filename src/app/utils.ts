import { EffectCallback, useEffect } from "react";
import { AbilityId, CharacterId } from "../types/typeAliases";
import { NkmCharacterView } from "../types/game/character/NkmCharacterView";
import { GameStateView } from "../types/game/GameStateView";
import { AbilityView } from "../types/game/ability/AbilityView";
import { GameRoute } from "../types/game/ws/GameRoute";
import { WebsocketGameRequest } from "../types/game/ws/WebsocketGameRequest";
import * as _ from "lodash";
import { UseData } from "../types/game/ability/UseData";
// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMountEffect = (fun: EffectCallback) => useEffect(fun, []);

export const toClockTime = (millis: number) =>
  new Date(millis).toISOString().slice(11, -1);

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

export function routeToRequest(
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
        _.head([gameState.draftPickState?.charactersAvailableToPick ?? []]) ??
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
      json.message = "";
      break;
    case GameRoute.ExecuteCommand:
      json.command = "";
      break;
  }
  return { requestPath: route, requestJson: JSON.stringify(json) };
}
