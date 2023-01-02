import {Routes} from "./Routes";

export const mainRouteMap = [
  ["Home", Routes.HOME],
  ["Maps", Routes.HEXMAPS],
  ["Characters", Routes.CHARACTERS],
  ["Lobbies", Routes.LOBBIES],
];

export const notLoggedInRouteMap = [
  ["Login", Routes.LOGIN],
  ["Register", Routes.REGISTER],
];
export const loggedInRouteMap = [["Profil", Routes.USER]];

