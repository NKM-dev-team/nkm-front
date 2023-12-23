import { GameEventView } from "../../types/game/GameEventView";
import { GameStateView } from "../../types/game/GameStateView";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
import CharacterHexagon from "../images/CharacterHexagon";
import AbilityImage from "../images/AbilityImage";
import CharacterEffectImage from "../images/CharacterEffectImage";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { CharacterEffectType } from "../../types/game/character_effect/CharacterEffectType";
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
    if (gameEvent.className == "ClockUpdated") return "";

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
