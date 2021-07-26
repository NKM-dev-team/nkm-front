import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

export default function HomeView() {
  return (
    <Paper variant="outlined">
      <Grid container justify="center">
        <img src="/nkm_logo.png" alt="nkm logo" />
      </Grid>
      <Typography variant="h2" align="center">
        Your favourite game (for sure)
      </Typography>
      <Typography>NKM is a great game. If it works.</Typography>
      <Typography>Seriously, imagine if you paid the developer.</Typography>
      <Typography>Please register and login using the navbar.</Typography>
    </Paper>
  );
}
