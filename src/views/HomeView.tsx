import React from "react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  enqueueNotificationError,
  enqueueNotificationSuccess,
} from "../features/notificationSlice";
import logo from "../img/nkm_logo.png"

export default function HomeView() {
  const dispatch = useDispatch();
  return (
    <Paper variant="outlined">
      <Grid container justifyContent="center">
        <img src={logo} alt="nkm logo" />
      </Grid>
      <Typography variant="h2" align="center">
        Your favourite game (for sure)
      </Typography>
      <Typography>NKM is a great game. If it works.</Typography>
      <Typography>Seriously, imagine if you paid the developer.</Typography>
      <Typography>Please register and login using the navbar.</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(enqueueNotificationSuccess("It works!"))}
      >
        Test notification
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() =>
          dispatch(enqueueNotificationError("Oh no, you are a pirate! ARRR"))
        }
      >
        Test notification but bad
      </Button>
    </Paper>
  );
}
