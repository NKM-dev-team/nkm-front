import React from "react";
import { GameEventView } from "../../types/game/GameEventView";
import GameEventCard from "./GameEventCard";
import { List, ListItem } from "@mui/material";
import { GameStateView } from "../../types/game/GameStateView";

interface GameEventViewProps {
  eventViews: GameEventView[];
  gameState: GameStateView;
}

export default function GameEventsComponent({
  eventViews,
  gameState,
}: GameEventViewProps) {
  return (
    <List>
      {eventViews.map((e, i) => {
        return (
          <ListItem key={i}>
            <GameEventCard gameEvent={e} gameState={gameState} />
          </ListItem>
        );
      })}
    </List>
  );
}
