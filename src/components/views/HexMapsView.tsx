import React, { Suspense } from "react";
import { Typography, Grid, Alert, Box, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ErrorBoundary } from "react-error-boundary";
import { HexMapTemplate } from "../../types/game/hex/HexMapTemplate";

const LazyHexMapComponent = React.lazy(
  () => import("../hexmaps_view/LazyHexMapComponent")
);
// import { MemoizedHexMapComponent } from "../hexmaps_view/HexMapComponent";

export default function HexMapsView() {
  const hexMapData = useSelector((state: RootState) => state.hexMapData);
  const hexMapSquares = hexMapData.hexMapList.map((hexMap: HexMapTemplate) => (
    <Grid item key={hexMap.name}>
      <Box>
        <Typography variant="h6" align="center">
          {hexMap.name}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Suspense
            fallback={
              <Skeleton
                variant="circular"
                animation="wave"
                width={100}
                height={100}
              />
            }
          >
            <LazyHexMapComponent scale={3} hexMap={hexMap} />
          </Suspense>
        </Box>
      </Box>
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
      <Grid container justifyContent="center" spacing={3} p={2}>
        {hexMapSquares}
      </Grid>
    </ErrorBoundary>
  );
}
