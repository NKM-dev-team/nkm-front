import { NkmCharacterView } from "./character/NkmCharacterView";

export interface Player {
  name: string;
  characters: NkmCharacterView[];
}
