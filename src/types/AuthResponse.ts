import { UserStateView } from "./UserStateView";

export interface AuthResponse {
  token: string;
  userState: UserStateView;
}
