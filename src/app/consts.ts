export const VERSION_CHECK_INTERVAL = 1000 * 60 * 5; // every 5 minutes
export const LOBBY_REFRESH_INTERVAL = 1000 * 5; // every 5 seconds
export const CLOCK_UPDATE_INTERVAL = 100;

export const BACKEND_TIME_OFFSET = 2 * 1000 * 60 * 60; // two hours
export const SHOW_LOBBIES_FRESHER_THAN = 1000 * 60 * 15; // 15 minutes

const LOCAL_DOMAIN = "localhost:3737";
const REMOTE_DOMAIN = "krzysztofruczkowski.pl";

export const API_URL_STABLE = `https://${REMOTE_DOMAIN}/nkm/api`;

const LOCAL_URL = {
  API: `http://${LOCAL_DOMAIN}/api`,
  WS: `ws://${LOCAL_DOMAIN}/ws`,
};

const REMOTE_URL = {
  API: `https://${REMOTE_DOMAIN}/nkm-next/api`,
  WS: `wss://${REMOTE_DOMAIN}/nkm-next/ws`,
};

const URL =
  process.env.REACT_APP_LOCAL_BACKEND === "true" ? LOCAL_URL : REMOTE_URL;

export const API_URL = URL.API;
export const WS_URL = URL.WS;

export const WS_LOBBY_URL = `${WS_URL}/lobby`;
export const WS_GAME_URL = `${WS_URL}/game`;

export const LOGIN_URL = `${API_URL}/login`;
export const OAUTH_GOOGLE_LOGIN_URL = `${API_URL}/oauth-google`;
export const REGISTER_URL = `${API_URL}/register`;
export const MAPS_API_URL = `${API_URL}/maps`;
export const CHARACTERS_URL = `${API_URL}/characters`;
export const ABILITIES_URL = `${API_URL}/abilities`;
export const CHARACTER_EFFECTS_URL = `${API_URL}/character_effects`;
export const VERSION_URL = `${API_URL}/version`;
export const VERSION_URL_STABLE = `${API_URL_STABLE}/version`;
export const GET_LOBBIES_URL = `${API_URL}/lobbies`;
export const GET_LOBBY_URL = (lobbyId: string) => `${API_URL}/lobby/${lobbyId}`;
export const GET_GAME_STATE_URL = (lobbyId: string) =>
  `${API_URL}/state/${lobbyId}`;

export const FETCH_BUG_REPORT_URL = `${API_URL}/bug_reports/fetch`;
export const CREATE_BUG_REPORT_URL = `${API_URL}/bug_reports/create`;
export const SET_RESOLVED_BUG_REPORT_URL = `${API_URL}/bug_reports/set_resolved`;

export const GITHUB_SERVER_MASTER_HEAD_URL =
  "https://api.github.com/repos/nkm-game/nkm-server/git/refs/heads/master";
export const GITHUB_SERVER_COMMIT_URL = (commit: string) =>
  `https://github.com/nkm-game/nkm-server/commit/${commit}`;
export const GITHUB_SERVER_COMMITS_URL =
  "https://github.com/nkm-game/nkm-server/commits/master";

export const DRAWER_WIDTH = 240;
