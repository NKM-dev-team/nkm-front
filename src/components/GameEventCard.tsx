import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Tooltip,
} from "@mui/material";
import React from "react";
import { GameEventView } from "../types/game/GameEventView";
import { TitledPaper } from "./TitledPaper";
import { InfoLabel } from "./InfoLabel";
import IconButton from "@mui/material/IconButton";

interface GameEventCardProps {
  eventView: GameEventView;
}

export default function GameEventCard({ eventView }: GameEventCardProps) {
  const [open, setOpen] = React.useState(false);
  const event = JSON.parse(eventView.eventJson);
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
          {eventView.className}
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{eventView.className}</DialogTitle>
        <DialogContent>{eventData}</DialogContent>
      </Dialog>
    </>
  );
}
