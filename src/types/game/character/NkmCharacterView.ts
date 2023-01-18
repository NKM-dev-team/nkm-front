import { NkmCharacterState } from "./NkmCharacterState";

export interface NkmCharacterView {
  id: string;
  metadataId: string;
  state: NkmCharacterState;
}
