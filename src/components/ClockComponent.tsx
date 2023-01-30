import React from "react";
import { Clock } from "../types/game/Clock";
import { Grid, Paper, Typography } from "@mui/material";
import { TitledPaper } from "./TitledPaper";
import { InfoLabel } from "./InfoLabel";
import { UserChip } from "./UserChip";
import { toClockTime } from "../app/utils";

interface ClockComponentProps {
  clock: Clock;
  name?: string;
}

export default function ClockComponent({ clock, name }: ClockComponentProps) {
  return (
    <Paper variant="outlined" sx={{ p: 1, overflow: "auto", height: 300 }}>
      <Typography>{name ?? "Clock"}</Typography>
      <TitledPaper title="Is running">
        <InfoLabel content={String(clock.isRunning)} />
      </TitledPaper>
      <TitledPaper title="Shared time">
        <InfoLabel content={toClockTime(clock.sharedTime)} />
      </TitledPaper>
      <TitledPaper title="Game timers">
        <Grid container spacing={1} sx={{ p: 1 }}>
          {Object.keys(clock.playerTimes).map((pid) => (
            <Grid item container justifyContent="space-between" key={pid}>
              <UserChip username={pid} />
              <InfoLabel content={toClockTime(clock.playerTimes[pid])} />
            </Grid>
          ))}
        </Grid>
      </TitledPaper>
    </Paper>
  );
}
