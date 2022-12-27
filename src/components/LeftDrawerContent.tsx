import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Routes } from "../types/Routes";

const mainRouteMap = [
  ["Home", Routes.HOME],
  ["Maps", Routes.HEXMAPS],
  ["Characters", Routes.CHARACTERS],
  ["Lobbies", Routes.LOBBIES],
];

const notLoggedInRouteMap = [
  ["Login", Routes.LOGIN],
  ["Register", Routes.REGISTER],
];
const loggedInRouteMap = [["Profil", Routes.USER]];

function CustomListItem(m: (string | Routes)[]) {
  return (
    <ListItem
      button
      key={m[0]}
      component={NavLink}
      to={m[1]}
      activeStyle={{
        fontWeight: "bold",
        background: "#292828",
      }}
      exact
    >
      <ListItemText primary={m[0]} />
    </ListItem>
  );
}

export default function LeftDrawerContent() {
  const authData = useSelector((state: RootState) => state.authData);
  const authRouteMap = authData.login ? loggedInRouteMap : notLoggedInRouteMap;
  return (
    <>
      <List>{mainRouteMap.map((m) => CustomListItem(m))}</List>
      <Divider />
      <List>{authRouteMap.map((m) => CustomListItem(m))}</List>
    </>
  );
}
