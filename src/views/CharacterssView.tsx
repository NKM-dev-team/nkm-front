import React from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { HexMap } from "../features/hexMapSlice";
import { MemoizedHexMapComponent } from "../components/HexMapComponent";
import { NKMCharacterMetadata } from "../features/charactersSlice";

export default function CharactersView() {
  const charactersData = useSelector(
    (state: RootState) => state.charactersData
  );
  const characterSquares = charactersData.characterMetadataList.map(
    (c: NKMCharacterMetadata) => (
      <Grid item key={c.name}>
        <Paper>
          <Typography variant="h4" align="center">
            {c.name}
          </Typography>
          <Typography variant="h5" align="center">
            Health points: {c.initialHealthPoints}
          </Typography>
          <Typography variant="h5" align="center">
            Attack points: {c.initialAttackPoints}
          </Typography>
        </Paper>
      </Grid>
    )
  );

  return (
    <Grid container justify="center" spacing={2}>
      {characterSquares}
    </Grid>
  );
}
