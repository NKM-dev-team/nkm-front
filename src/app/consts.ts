export const GITHUB_SERVER_MASTER_HEAD_URL = "https://api.github.com/repos/nkm-game/nkm-server/git/refs/heads/master";
export const GITHUB_SERVER_COMMIT_URL = (commit: string) => `https://github.com/nkm-game/nkm-server/commit/${commit}`;
export const GITHUB_SERVER_COMMITS_URL = "https://github.com/nkm-game/nkm-server/commits/master";

export const API_URL = "https://krzysztofruczkowski.pl/nkm/api";
export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const MAPS_API_URL = `${API_URL}/maps`;
export const CHARACTERS_URL = `${API_URL}/characters`;
export const ABILITIES_URL = `${API_URL}/abilities`;
export const CHARACTER_EFFECTS_URL = `${API_URL}/character_effects`;
export const VERSION_URL = `${API_URL}/version`;
export const GET_LOBBIES_URL = `${API_URL}/lobbies`;
export const GET_LOBBY_URL = (lobbyId: string) => `${API_URL}/lobby/${lobbyId}`;
export const GET_GAME_STATE_URL = (lobbyId: string) =>
  `${API_URL}/state/${lobbyId}`;

export const CREATE_LOBBY_URL = `${API_URL}/create_lobby`;
export const JOIN_LOBBY_URL = `${API_URL}/join_lobby`;
export const LEAVE_LOBBY_URL = `${API_URL}/leave_lobby`;
export const SET_HEXMAP_URL = `${API_URL}/set_hexmap`;
export const SET_PICK_TYPE_URL = `${API_URL}/set_pick_type`;
export const SET_NUMBER_OF_BANS_URL = `${API_URL}/set_number_of_bans`;
export const SET_NUMBER_OF_CHARACTERS_URL = `${API_URL}/set_number_of_characters`;
export const START_GAME_URL = `${API_URL}/start_game`;

export const PLACE_CHARACTER_URL = `${API_URL}/place_character`;

export const API_CHECK_TIMEOUT = 1000 * 60 * 5; // every 5 minutes