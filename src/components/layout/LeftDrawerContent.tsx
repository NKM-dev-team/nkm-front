import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Routes } from "../../types/Routes";
import { AUTH_ROUTE_MAP, MAIN_ROUTE_MAP } from "../../types/route_mapping";

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
  return (
    <>
      <List>{MAIN_ROUTE_MAP.map((m) => CustomListItem(m))}</List>
      <Divider />
      <List>
        {AUTH_ROUTE_MAP(Boolean(authData.login)).map((m) => CustomListItem(m))}
      </List>
    </>
  );
}
