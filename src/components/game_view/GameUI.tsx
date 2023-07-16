import { Typography } from "@mui/material";
import React from "react";
import { GameStateView } from "../../types/game/GameStateView";
import { GameWsHandler } from "../../app/gameWsHandler";
import { AuthState } from "../../types/authState";
import { PickType } from "../../types/game/PickType";
import BlindPick from "./BlindPick";

interface GameUIProps {
  gameWsHandler: GameWsHandler;
  gameState: GameStateView;
  authState: AuthState;
}

export default function GameUI({
  gameWsHandler,
  gameState,
  authState,
}: GameUIProps) {
  return (
    <>
      <Typography>Game status: {gameState.gameStatus}</Typography>
      {gameState.isInCharacterSelect &&
      gameState.pickType === PickType.BlindPick ? (
        <BlindPick
          gameWsHandler={gameWsHandler}
          gameState={gameState}
          authState={authState}
        ></BlindPick>
      ) : null}
    </>
  );
}
