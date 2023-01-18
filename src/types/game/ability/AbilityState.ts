export interface AbilityState {
  cooldown: number;
  isEnabled: boolean;
  variables: { [key: string]: string };
}
