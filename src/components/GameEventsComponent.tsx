import React from "react";
import { GameEventView } from "../types/game/GameEventView";
import GameEventCard from "./GameEventCard";
import { List, ListItem } from "@mui/material";

interface GameEventViewProps {
  eventViews: GameEventView[];
}

export default function GameEventsComponent({
  eventViews,
}: GameEventViewProps) {
  return (
    <List>
      {eventViews.map((e, i) => {
        return (
          <ListItem key={i}>
            <GameEventCard eventView={e} />
          </ListItem>
        );
      })}
    </List>
  );
}
