import { Grid, List, ListItem, Paper, Typography } from "@mui/material";
import React from "react";
import { GameStateView } from "../types/game/GameStateView";
import CharacterHexagon from "./images/CharacterHexagon";
import { MemoizedHexMapComponent } from "./HexMapComponent";
import { characterById } from "../app/utils";
import { GameEventView } from "../types/game/GameEventView";
import GameEventsComponent from "./GameEventsComponent";
import { TitledPaper } from "./TitledPaper";
import { InfoLabel } from "./InfoLabel";
import { UserChip } from "./UserChip";

interface GameDashboardProps {
  gameState: GameStateView;
  incomingEventViews: GameEventView[];
}

export default function GameDashboard({
  gameState,
  incomingEventViews,
}: GameDashboardProps) {
  const toClockTime = (millis: number) =>
    new Date(millis).toISOString().slice(11, -1);

  return (
    <Grid container justifyContent="space-between" spacing={1}>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ p: 1, overflow: "auto", height: 600 }}>
          <Typography>Game log</Typography>
          <GameEventsComponent eventViews={gameState.gameLog.events} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ p: 1, overflow: "auto", height: 600 }}>
          <Typography>Incoming events</Typography>
          <GameEventsComponent eventViews={incomingEventViews} />
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
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ p: 1, overflow: "auto", height: 600 }}>
          <Typography>Clock</Typography>
          <TitledPaper title="Is running">
            <InfoLabel content={String(gameState.clock.isRunning)} />
          </TitledPaper>
          <TitledPaper title="Shared time">
            <InfoLabel content={toClockTime(gameState.clock.sharedTime)} />
          </TitledPaper>
          <TitledPaper title="Game timers">
            <Grid container spacing={1} sx={{ p: 1 }}>
              {Object.keys(gameState.clock.playerTimes).map((pid) => (
                <Grid item container justifyContent="space-between" key={pid}>
                  <UserChip username={pid} />
                  <InfoLabel
                    content={toClockTime(gameState.clock.playerTimes[pid])}
                  />
                </Grid>
              ))}
            </Grid>
          </TitledPaper>
        </Paper>
      </Grid>
      <Grid item xs={12} justifyContent="center">
        {gameState.hexMap && (
          <MemoizedHexMapComponent
            scale={0.7}
            hexMap={gameState.hexMap}
            onHexagonClick={(c) => console.log(c.coordinates)}
          />
        )}
      </Grid>
    </Grid>
  );
}
