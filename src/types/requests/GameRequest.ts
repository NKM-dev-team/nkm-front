import { HexCoordinates } from "../game/hex/HexCoordinates";
import {
  AbilityId,
  CharacterId,
  CharacterMetadataId,
  GameId,
} from "../typeAliases";
import { UseData } from "../game/ability/UseData";

export interface Auth {
  token: string;
}

export interface Observe {
  lobbyId: GameId;
}

export interface GetState {
  lobbyId: GameId;
}

export interface GetCurrentClock {
  lobbyId: GameId;
}

export interface Pause {
  lobbyId: GameId;
}

export interface Surrender {
  lobbyId: GameId;
}

export interface BanCharacters {
  lobbyId: GameId;
  characterIds: CharacterMetadataId[];
}

export interface PickCharacter {
  lobbyId: GameId;
  characterId: CharacterMetadataId;
}

export interface BlindPickCharacters {
  lobbyId: GameId;
  characterIds: CharacterMetadataId[];
}

export interface PlaceCharacters {
  lobbyId: GameId;
  coordinatesToCharacterIdMap: { [key: string]: CharacterId }; // TODO: key should be coordinates
}

export interface EndTurn {
  lobbyId: GameId;
}

export interface PassTurn {
  lobbyId: GameId;
  characterId: CharacterId;
}

export interface Move {
  lobbyId: GameId;
  path: HexCoordinates[];
  characterId: CharacterId;
}

export interface BasicAttack {
  lobbyId: GameId;
  attackingCharacterId: CharacterId;
  targetCharacterId: CharacterId;
}

export interface UseAbilityWithoutTarget {
  lobbyId: GameId;
  abilityId: AbilityId;
}

export interface UseAbilityOnCoordinates {
  lobbyId: GameId;
  abilityId: AbilityId;
  target: HexCoordinates;
  useData: UseData;
}

export interface UseAbilityOnCharacter {
  lobbyId: GameId;
  abilityId: AbilityId;
  target: HexCoordinates;
  useData: UseData;
}

export interface SendChatMessage {
  lobbyId: GameId;
  message: String;
}

export interface ExecuteCommand {
  lobbyId: GameId;
  command: String;
}
