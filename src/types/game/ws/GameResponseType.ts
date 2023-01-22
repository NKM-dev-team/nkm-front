export enum GameResponseType {
  Auth = "auth",
  Observe = "observe",
  GetState = "state",
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
  UseAbility = "use_ability",

  SendChatMessage = "send_chat_msg",
  ExecuteCommand = "exec",

  Error = "error",
  Event = "event",
}
