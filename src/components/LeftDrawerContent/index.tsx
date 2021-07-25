import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const mainRouteMap = [
  ["Strona główna", "/"],
  ["Mapy", "/hexmaps"],
  ["Pokoje", "/lobbies"],
];

const notLoggedInRouteMap = [
  ["Zaloguj się", "/login"],
  ["Zarejestruj się", "/register"],
];
const loggedInRouteMap = [
  ["Profil", "/user"],
  // ["Wyloguj się", "/logout"],
];

export default function LeftDrawerContent() {
  const authData = useSelector((state: RootState) => state.authData);
  const authRouteMap = authData.login ? loggedInRouteMap : notLoggedInRouteMap;
  return (
    <>
      <List>
        {mainRouteMap.map((m) => (
          <ListItem button key={m[0]} component={RouterLink} to={m[1]}>
            <ListItemText primary={m[0]} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {authRouteMap.map((m) => (
          <ListItem button key={m[0]} component={RouterLink} to={m[1]}>
            <ListItemText primary={m[0]} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
