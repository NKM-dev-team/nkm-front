import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const routeMap = [
  ["Strona główna", "/"],
  ["Mapy", "/hexmaps"],
];

export default function LeftDrawerContent() {
  return (
    <>
      <List>
        {routeMap.map((m) => (
          <ListItem button key={m[0]} component={RouterLink} to={m[1]}>
            <ListItemText primary={m[0]} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Zaloguj się"].map((text) => (
          <ListItem button key={text} component={RouterLink} to={"/login"}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
