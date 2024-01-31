export const VERSION_CHECK_INTERVAL = 1000 * 60 * 5; // every 5 minutes
export const LOBBY_REFRESH_INTERVAL = 1000 * 5; // every 5 seconds
export const CLOCK_UPDATE_INTERVAL = 100;

export const BACKEND_TIME_OFFSET = 2 * 1000 * 60 * 60; // two hours
export const SHOW_LOBBIES_FRESHER_THAN = 1000 * 60 * 15; // 15 minutes

export const GITHUB_SERVER_MASTER_HEAD_URL =
  "https://api.github.com/repos/nkm-game/nkm-server/git/refs/heads/master";
export const GITHUB_SERVER_COMMIT_URL = (commit: string) =>
  `https://github.com/nkm-game/nkm-server/commit/${commit}`;
export const GITHUB_SERVER_COMMITS_URL =
  "https://github.com/nkm-game/nkm-server/commits/master";

export const DRAWER_WIDTH = 240;
