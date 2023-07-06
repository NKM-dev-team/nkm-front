import { UserStateView } from "./UserStateView";

export interface AuthState {
  token: string | null;
  userState: UserStateView | null;
}
