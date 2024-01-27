import { GameEventView } from "../../types/game/GameEventView";
import { GameStateView } from "../../types/game/GameStateView";
import React from "react";
import { Grid, Typography } from "@mui/material";
import GameEventImages from "./GameEventImages";

interface GameEventLabelProps {
  gameEvent: GameEventView;
  gameState: GameStateView;
}

export default function GameEventLabel({
  gameEvent,
  gameState,
}: GameEventLabelProps) {
  const event = JSON.parse(gameEvent.eventJson);

  const getLabelText = () => {
    if (gameEvent.className === "ClockUpdated") return "";

    return gameEvent.className;
  };

  return (
    <Grid container spacing={1}>
      <Grid item>
        <GameEventImages gameEvent={gameEvent} gameState={gameState} />
      </Grid>
      <Grid item>
        <Typography>{getLabelText()}</Typography>
      </Grid>
    </Grid>
  );
}
