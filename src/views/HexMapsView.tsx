import React from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { MemoizedHexMapComponent } from "../components/HexMapComponent";
import { HexMapView } from "../types/game/hex/HexMapView";

export default function HexMapsView() {
  const hexMapData = useSelector((state: RootState) => state.hexMapData);
  const hexMapSquares = hexMapData.hexMapList.map((hexMap: HexMapView) => (
    <Grid item key={hexMap.name}>
      <Paper>
        <Typography variant="h4" align="center">
          {hexMap.name}
        </Typography>
        <MemoizedHexMapComponent scale={0.5} hexMap={hexMap} />
      </Paper>
    </Grid>
  ));

  return (
    <Grid container justifyContent="center" spacing={2}>
      {hexMapSquares}
    </Grid>
  );
}
