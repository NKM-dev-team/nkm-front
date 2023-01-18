import { GameEventId, PlayerId } from "../typeAliases";
import { Phase } from "./Phase";
import { Turn } from "./Turn";

export interface GameEvent {
  id: GameEventId;
  phase: Phase;
  turn: Turn;
  causedById: string;
  hiddenFor: Set<PlayerId | null>;
}
