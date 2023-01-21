export const VERSION_CHECK_INTERVAL = 1000 * 60 * 5; // every 5 minutes
export const LOBBY_REFRESH_INTERVAL = 1000 * 5; // every 5 seconds

export const BACKEND_TIME_OFFSET = 1000 * 60 * 60; // one hour
export const SHOW_LOBBIES_FRESHER_THAN = 1000 * 60 * 5; // 5 minutes

const API_URL = "https://krzysztofruczkowski.pl/nkm/api";
const WS_URL = "wss://krzysztofruczkowski.pl/nkm/ws";

export const WS_LOBBY_URL = `${WS_URL}/lobby`;
export const WS_GAME_URL = `${WS_URL}/game`;

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

export const GITHUB_SERVER_MASTER_HEAD_URL =
  "https://api.github.com/repos/nkm-game/nkm-server/git/refs/heads/master";
export const GITHUB_SERVER_COMMIT_URL = (commit: string) =>
  `https://github.com/nkm-game/nkm-server/commit/${commit}`;
export const GITHUB_SERVER_COMMITS_URL =
  "https://github.com/nkm-game/nkm-server/commits/master";
