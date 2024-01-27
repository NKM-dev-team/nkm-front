import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Tooltip,
} from "@mui/material";
import React from "react";
import { GameEventView } from "../../types/game/GameEventView";
import { TitledPaper } from "../TitledPaper";
import { InfoLabel } from "../InfoLabel";
import IconButton from "@mui/material/IconButton";
import { GameStateView } from "../../types/game/GameStateView";
import GameEventLabel from "./GameEventLabel";

interface GameEventCardProps {
  gameEvent: GameEventView;
  gameState: GameStateView;
}

export default function GameEventCard({
  gameEvent,
  gameState,
}: GameEventCardProps) {
  const [open, setOpen] = React.useState(false);
  const event = JSON.parse(gameEvent.eventJson);
  const eventData = (
    <Grid container flexDirection="column" overflow="auto">
      {Object.keys(event).map((key) => {
        return (
          <Grid item key={key}>
            <TitledPaper title={key}>
              <InfoLabel content={JSON.stringify(event[key])} />
            </TitledPaper>
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <>
      <Tooltip title={eventData} placement="right" arrow>
        <IconButton onClick={() => setOpen(true)}>
          <GameEventLabel gameEvent={gameEvent} gameState={gameState} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{gameEvent.className}</DialogTitle>
        <DialogContent>{eventData}</DialogContent>
      </Dialog>
    </>
  );
}
