import { useSelector } from "react-redux";
import { ApiVersion } from "../features/settingsSlice";
import { RootState } from "./store";

const LOCAL_DOMAIN = "localhost:3737";
const REMOTE_DOMAIN = "krzysztofruczkowski.pl";

const URLS = {
  [ApiVersion.Latest]: {
    API: `https://${REMOTE_DOMAIN}/nkm-next/api`,
    WS: `wss://${REMOTE_DOMAIN}/nkm-next/ws`,
  },
  [ApiVersion.Stable]: {
    API: `https://${REMOTE_DOMAIN}/nkm/api`,
    WS: `wss://${REMOTE_DOMAIN}/nkm/ws`,
  },
  [ApiVersion.Local]: {
    API: `http://${LOCAL_DOMAIN}/api`,
    WS: `ws://${LOCAL_DOMAIN}/ws`,
  },
};

export const getNkmApi = (apiVersion: ApiVersion) => {
  const baseUrl = URLS[apiVersion] || URLS[ApiVersion.Stable];

  return {
    LOGIN_URL: `${baseUrl.API}/login`,
    OAUTH_GOOGLE_LOGIN_URL: `${baseUrl.API}/oauth-google`,
    REGISTER_URL: `${baseUrl.API}/register`,
    MAPS_API_URL: `${baseUrl.API}/maps`,
    CHARACTERS_URL: `${baseUrl.API}/characters`,
    ABILITIES_URL: `${baseUrl.API}/abilities`,
    CHARACTER_EFFECTS_URL: `${baseUrl.API}/character_effects`,
    VERSION_URL: `${baseUrl.API}/version`,
    GET_LOBBIES_URL: `${baseUrl.API}/lobbies`,
    GET_LOBBY_URL: (lobbyId: string) => `${baseUrl.API}/lobby/${lobbyId}`,
    GET_GAME_STATE_URL: (lobbyId: string) => `${baseUrl.API}/state/${lobbyId}`,
    FETCH_BUG_REPORT_URL: `${baseUrl.API}/bug_reports/fetch`,
    CREATE_BUG_REPORT_URL: `${baseUrl.API}/bug_reports/create`,
    SET_RESOLVED_BUG_REPORT_URL: `${baseUrl.API}/bug_reports/set_resolved`,
    WS_LOBBY_URL: `${baseUrl.WS}/lobby`,
    WS_GAME_URL: `${baseUrl.WS}/game`,
    GITHUB_SERVER_MASTER_HEAD_URL:
      "https://api.github.com/repos/nkm-game/nkm-server/git/refs/heads/master",
    GITHUB_SERVER_COMMIT_URL: (commit: string) =>
      `https://github.com/nkm-game/nkm-server/commit/${commit}`,
    GITHUB_SERVER_COMMITS_URL:
      "https://github.com/nkm-game/nkm-server/commits/master",
  };
};

export const useNkmApi = () => {
  const apiVersion = useSelector(
    (state: RootState) => state.settingsData.apiVersion
  );
  return getNkmApi(apiVersion);
};
