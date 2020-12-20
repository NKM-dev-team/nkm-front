import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { HexMap } from "../../features/hexMapSlice";

export default function HexMapsView() {
  const hexMapData = useSelector((state: RootState) => state.hexMapData);
  return (
    <List>
      {hexMapData.hexMapList.map((hexMap: HexMap) => (
        <ListItem key={hexMap.name}>
          <ListItemText primary={hexMap.name} />
        </ListItem>
      ))}
    </List>
  );
}
