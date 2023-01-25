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
  charactersMetadata: CharacterMetadata[];
  gameStatus: GameStatus;
  pickType: PickType;
  numberOfBans: number;
  numberOfCharactersPerPlayer: number;
  draftPickState: DraftPickStateView | null;
  blindPickState: BlindPickStateView | null;
  hexMap: HexMapView | null;
  players: Player[];
  characters: NkmCharacterView[];
  abilities: AbilityView[];
  effects: CharacterEffectView[];
  phase: Phase;
  turn: Turn;
  characterIdsOutsideMap: CharacterId[];
  characterIdsThatTookActionThisPhase: CharacterId[];
  characterTakingActionThisTurn: CharacterId | null;
  playerIdsThatPlacedCharacters: PlayerId[];
  clockConfig: ClockConfig;
  clock: Clock;
  gameLog: GameLogView;

  currentPlayerId: PlayerId;
}
