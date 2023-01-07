import {Routes} from "./Routes";

export const MAIN_ROUTE_MAP = [
  ["Home", Routes.HOME],
  ["Status", Routes.STATUS],
  ["Maps", Routes.HEXMAPS],
  ["Characters", Routes.CHARACTERS],
  ["Lobbies", Routes.LOBBIES],
];

export const NOT_LOGGED_IN_ROUTE_MAP = [
  ["Login", Routes.LOGIN],
  ["Register", Routes.REGISTER],
];
export const LOGGED_IN_ROUTE_MAP = [["Profil", Routes.USER]];

export const AUTH_ROUTE_MAP = (loggedIn: boolean) => loggedIn ? LOGGED_IN_ROUTE_MAP : NOT_LOGGED_IN_ROUTE_MAP;

