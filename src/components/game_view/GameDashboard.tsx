import { Grid, List, ListItem, Paper, Typography } from "@mui/material";
import React from "react";
import { GameStateView } from "../../types/game/GameStateView";
import CharacterHexagon from "../images/CharacterHexagon";
import { characterById, toClockTime, useClock } from "../../app/utils";
import { GameEventView } from "../../types/game/GameEventView";
import GameEventsComponent from "./GameEventsComponent";
import { TitledPaper } from "../TitledPaper";
import { InfoLabel } from "../InfoLabel";
import { UserChip } from "../layout/UserChip";
import ClockComponent from "./ClockComponent";
import { Clock } from "../../types/game/Clock";

interface GameDashboardProps {
  gameState: GameStateView;
  incomingEventViews: GameEventView[];
  lastClock: Clock;
}

export default function GameDashboard({
  gameState,
  incomingEventViews,
  lastClock,
}: GameDashboardProps) {
  const currentClock = useClock(lastClock, gameState);

  return (
    <Grid container justifyContent="space-between" spacing={1}>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ p: 1, overflow: "auto", height: 600 }}>
          <Typography>Game log</Typography>
          <GameEventsComponent
            eventViews={gameState.gameLog.events}
            gameState={gameState}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ p: 1, overflow: "auto", height: 600 }}>
          <Typography>Incoming events</Typography>
          <GameEventsComponent
            eventViews={incomingEventViews}
            gameState={gameState}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ p: 1, overflow: "auto", height: 600 }}>
          <TitledPaper title="Game status">
            <InfoLabel content={gameState.gameStatus} />
          </TitledPaper>
          <TitledPaper title="Pick type">
            <InfoLabel content={gameState.pickType} />
          </TitledPaper>
          <TitledPaper title="Phase">
            <InfoLabel content={gameState.phase.number} />
          </TitledPaper>
          <TitledPaper title="Turn">
            <InfoLabel content={gameState.turn.number} />
          </TitledPaper>
          <TitledPaper title="Character mapping">
            <List>
              {gameState.players.map((player, index) => (
                <ListItem key={index}>
                  <List>
                    <UserChip username={player.name} />
                    <Grid container justifyContent="space-between">
                      {Array.from(player.characterIds).map((cid) => (
                        <Grid item key={cid} xs={2}>
                          <CharacterHexagon
                            name={characterById(gameState, cid).metadataId}
                            width={30}
                            tooltip
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </List>
                </ListItem>
              ))}
            </List>
          </TitledPaper>
          <TitledPaper title="Current player">
            <UserChip username={gameState.currentPlayerId} />
          </TitledPaper>
          <TitledPaper title="Current player time">
            <InfoLabel content={toClockTime(gameState.currentPlayerTime)} />
          </TitledPaper>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <ClockComponent clock={gameState.clock} />
        <ClockComponent clock={currentClock} name={"Current clock"} />
      </Grid>
      {/*<Grid item xs={12} justifyContent="center">*/}
      {/*{gameState.hexMap && (*/}
      {/*  <MemoizedHexMapComponent*/}
      {/*    scale={0.7}*/}
      {/*    hexMap={gameState.hexMap}*/}
      {/*    onHexagonClick={(c) => console.log(c.coordinates)}*/}
      {/*  />*/}
      {/*)}*/}
      {/*</Grid>*/}
    </Grid>
  );
}
