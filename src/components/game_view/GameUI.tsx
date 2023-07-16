import { Grid, List, ListItem, Paper, Typography } from "@mui/material";
import React from "react";
import { GameStateView } from "../../types/game/GameStateView";
import { GameWsHandler } from "../../app/gameWsHandler";
import { AuthState } from "../../types/authState";
import { PickType } from "../../types/game/PickType";
import BlindPick from "./BlindPick";
import { useClock } from "../../app/utils";
import { Clock } from "../../types/game/Clock";
import { GameStatus } from "../../types/game/GameStatus";
import { UserChip } from "../layout/UserChip";
import { InfoLabel } from "../InfoLabel";
import { TitledPaper } from "../TitledPaper";

interface GameUIProps {
  gameWsHandler: GameWsHandler;
  gameState: GameStateView;
  authState: AuthState;
  lastClock: Clock;
}

export default function GameUI({
  gameWsHandler,
  gameState,
  authState,
  lastClock,
}: GameUIProps) {
  const currentClock = useClock(lastClock, gameState);

  if (gameState.gameStatus === GameStatus.Finished) {
    return (
      <>
        <Grid container justifyContent="center">
          <TitledPaper title="Game finished.">
            <List>
              {gameState.players.map((p) => (
                <ListItem key={p.name}>
                  <UserChip username={p.name} />
                  <InfoLabel content={p.victoryStatus} />
                </ListItem>
              ))}
            </List>
          </TitledPaper>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Typography>Game status: {gameState.gameStatus}</Typography>
      {currentClock.isSharedTime ? (
        <Grid container justifyContent="center">
          <Paper sx={{ p: 1 }}>
            <Typography variant="h2">
              {Math.floor(currentClock.sharedTime / 1000)}
            </Typography>
          </Paper>
        </Grid>
      ) : null}
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
