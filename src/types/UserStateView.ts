import { UserId } from "./typeAliases";

export interface UserStateView {
  email: string;
  userId: UserId;
  isAdmin: boolean;
}
