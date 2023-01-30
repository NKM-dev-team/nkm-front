export enum GameRoute {
  Auth = "auth",
  Observe = "observe",
  GetState = "state",
  GetCurrentClock = "clock",
  Pause = "pause",
  Surrender = "surrender",

  BanCharacters = "ban_characters",
  PickCharacter = "pick_character",
  BlindPickCharacters = "blind_pick_characters",

  PlaceCharacters = "place_characters",
  EndTurn = "end_turn",
  PassTurn = "pass_turn",
  Move = "move",
  BasicAttack = "basic_attack",
  UseAbilityWithoutTarget = "use_ability_without_target",
  UseAbilityOnCoordinates = "use_ability_on_coordinates",
  UseAbilityOnCharacter = "use_ability_on_character",

  SendChatMessage = "send_chat_msg",
  ExecuteCommand = "exec",
}
