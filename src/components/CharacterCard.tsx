import React from "react";
import {Box, Grid, Paper, Typography} from "@mui/material";
import CharacterHexagon from "./CharacterHexagon";
import { CharacterMetadata } from "../features/charactersSlice";
import {RootState} from "../app/store";
import {useSelector} from "react-redux";
import Ability from "./Ability";
import {AbilityMetadata} from "../features/abilitiesSlice";

export default function CharacterCard({ c }: { c: CharacterMetadata }) {
  const abilitiesData = useSelector((state: RootState) => state.abilitiesData);
  const initialAbilityMetadatas: AbilityMetadata[] = c.initialAbilitiesMetadataIds
    .map(id => abilitiesData.abilityMetadatas.find(a => a.name === id))
    .flatMap(f => f ? [f] : []);

  const abilities = initialAbilityMetadatas.map(am => <Ability am={am}/>);

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
        <Grid container justifyContent="center" spacing={1}>
          {abilities}
        </Grid>
      </Paper>
    </Grid>
  );
}
