import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import CharacterHexagon from "./CharacterHexagon";
import { NKMCharacterMetadata } from "../features/charactersSlice";

export default function CharacterCard({ c }: { c: NKMCharacterMetadata }) {
  return (
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
        <CharacterHexagon name={c.name} />
      </Paper>
    </Grid>
  );
}
