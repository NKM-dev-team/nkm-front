import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import logo from "../img/nkm_logo.png";
import { NavLink } from "react-router-dom";
import { MAIN_ROUTE_MAP } from "../types/route_mapping";
import Divider from "@mui/material/Divider";

export default function HomeView() {
  return (
    <Paper variant="outlined" sx={{ p: 2, margin: 2 }}>
      <Grid container justifyContent="center">
        <img src={logo} alt="nkm logo" width={200} />
      </Grid>
      <Typography variant="h2" align="center">
        Your favourite game (for sure)
      </Typography>
      <Typography>NKM is a great game. If it works.</Typography>
      <Typography>Seriously, imagine if you paid the developer.</Typography>
      <Divider />
      <Grid container spacing={2} p={1}>
        {MAIN_ROUTE_MAP.filter((m) => m[0] !== "Home").map((m) => (
          <Grid item xs={4} key={m[0]}>
            <NavLink to={m[1]}>
              <Paper
                sx={{
                  p: 2,
                }}
              >
                {m[0]}
              </Paper>
            </NavLink>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
