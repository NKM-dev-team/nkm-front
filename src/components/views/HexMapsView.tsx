import React from "react";
import { Typography, Grid, Paper, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { MemoizedHexMapComponent } from "../hexmaps_view/HexMapComponent";
import { HexMapView } from "../../types/game/hex/HexMapView";
import { ErrorBoundary } from "react-error-boundary";

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
    <ErrorBoundary
      fallback={
        <Alert severity="error" sx={{ m: 2 }}>
          Something went wrong with maps render.
        </Alert>
      }
    >
      <Grid container justifyContent="center" spacing={2}>
        {hexMapSquares}
      </Grid>
    </ErrorBoundary>
  );
}
