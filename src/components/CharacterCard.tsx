import React from "react";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import CharacterHexagon from "./CharacterHexagon";
import { CharacterMetadata } from "../features/charactersSlice";

export default function CharacterCard({ c }: { c: CharacterMetadata }) {
  return (
    <Grid item>
      <Paper>
        <Typography variant="h6" align="center">
          {c.name}
        </Typography>
        <Box p={1}>
          <CharacterHexagon name={c.name} width={150}/>
        </Box>
        <Typography variant="body1" align="left">
          Health points: {c.initialHealthPoints}
        </Typography>
        <Typography variant="body1" align="left">
          Attack type: {c.attackType}
        </Typography>
        <Typography variant="body1" align="left">
          Attack points: {c.initialAttackPoints}
        </Typography>
        <Typography variant="body1" align="left">
          Range: {c.initialBasicAttackRange}
        </Typography>
        <Typography variant="body1" align="left">
          Speed: {c.initialSpeed}
        </Typography>
        <Typography variant="body1" align="left">
          Physical defense: {c.initialPsychicalDefense}
        </Typography>
        <Typography variant="body1" align="left">
          Magical defense: {c.initialMagicalDefense}
        </Typography>
        {/*<Typography variant="body1" align="left">*/}
        {/*  Abilities: {c.initialAbilitiesMetadataIds.join(', ')}*/}
        {/*</Typography>*/}
      </Paper>
    </Grid>
  );
}
