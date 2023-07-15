import { Typography } from "@mui/material";
import React from "react";
import { GameStateView } from "../../types/game/GameStateView";
import BlindPick from "./BlindPick";
import { GameWsHandler } from "../../app/gameWsHandler";

interface GameUIProps {
  gameWsHandler: GameWsHandler;
  gameState: GameStateView;
}

export default function GameUI({ gameWsHandler, gameState }: GameUIProps) {
  return (
    <>
      <Typography>Game status: {gameState.gameStatus}</Typography>
      {/*{gameState.gameStatus === GameStatus.CharacterPick ? (*/}
      <BlindPick
        gameWsHandler={gameWsHandler}
        gameState={gameState}
      ></BlindPick>
      {/*) : null}*/}
    </>
  );
}
