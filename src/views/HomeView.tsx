import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import logo from "../img/nkm_logo.png"

export default function HomeView() {
  return (
    <Paper variant="outlined" sx={{p: 2, margin: 2}}>
      <Grid container justifyContent="center">
        <img src={logo} alt="nkm logo" width={200}/>
      </Grid>
      <Typography variant="h2" align="center">
        Your favourite game (for sure)
      </Typography>
      <Typography>NKM is a great game. If it works.</Typography>
      <Typography>Seriously, imagine if you paid the developer.</Typography>
      <Grid container>
        <Grid item>

        </Grid>
      </Grid>
    </Paper>
  );
}
