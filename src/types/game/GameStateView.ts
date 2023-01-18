import { Phase } from "./Phase";
import { Player } from "./Player";
import { Turn } from "./Turn";
import { GameStatus } from "./GameStatus";
import { PickType } from "./PickType";
import { CharacterMetadata } from "./character/CharacterMetadata";
import { ClockConfig } from "./ClockConfig";
import { CharacterId, GameId, PlayerId } from "../typeAliases";
import { NkmCharacterView } from "./character/NkmCharacterView";
import { BlindPickStateView } from "./blindpick/BlindPickStateView";
import { DraftPickStateView } from "./draftpick/DraftPickStateView";
import { AbilityView } from "./ability/AbilityView";
import { CharacterEffectView } from "./effect/CharacterEffectView";
import { Clock } from "./Clock";
import { HexMapView } from "./hex/HexMapView";
import { GameLogView } from "./GameLogView";

export interface GameStateView {
  id: GameId;
  charactersMetadata: Set<CharacterMetadata>;
  gameStatus: GameStatus;
  pickType: PickType;
  numberOfBans: number;
  numberOfCharactersPerPlayer: number;
  draftPickState: DraftPickStateView | null;
  blindPickState: BlindPickStateView | null;
  hexMap: HexMapView | null;
  players: Player[];
  characters: Set<NkmCharacterView>;
  abilities: Set<AbilityView>;
  effects: Set<CharacterEffectView>;
  phase: Phase;
  turn: Turn;
  characterIdsOutsideMap: Set<CharacterId>;
  characterIdsThatTookActionThisPhase: Set<CharacterId>;
  characterTakingActionThisTurn: CharacterId | null;
  playerIdsThatPlacedCharacters: Set<PlayerId>;
  clockConfig: ClockConfig;
  clock: Clock;
  gameLog: GameLogView;

  currentPlayerId: PlayerId;
}
