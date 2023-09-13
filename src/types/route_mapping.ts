import { Routes } from "./Routes";

export const MAIN_ROUTE_MAP = [
  ["Home", Routes.HOME],
  ["Status", Routes.STATUS],
  ["Maps", Routes.HEXMAPS],
  ["Characters", Routes.CHARACTERS],
  ["Lobbies", Routes.LOBBIES],
];

// export const NOT_LOGGED_IN_ROUTE_MAP = []; //[["Register", Routes.REGISTER]];
// export const LOGGED_IN_ROUTE_MAP = []; //[["Profil", Routes.USER]];
export const ADMIN_ROUTE_MAP = [
  ["Admin panel", Routes.ADMIN],
  ["Release", Routes.RELEASE],
];

export const AUTH_ROUTE_MAP = (isAdmin: Boolean) =>
  isAdmin ? ADMIN_ROUTE_MAP : [];
