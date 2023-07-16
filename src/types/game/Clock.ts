import { PlayerId } from "../typeAliases";

export interface Clock {
  playerTimes: { [key: PlayerId]: number };
  sharedTime: number;
  isRunning: boolean;
  isSharedTime: boolean;
}
