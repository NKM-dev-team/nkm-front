import { UserStateView } from "./UserStateView";

export enum RequestStatus {
  Awaiting = "Awaiting",
  None = "None",
}

export interface AuthState {
  token: string | null;
  userState: UserStateView | null;
  registerRequestStatus: RequestStatus;
  loginRequestStatus: RequestStatus;
}
