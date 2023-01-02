import React from "react";
import {Grid, Paper, Tooltip, Typography} from "@mui/material";
import CharacterHexagon from "./images/CharacterHexagon";
import {AttackType, CharacterMetadata} from "../features/charactersSlice";
import {RootState} from "../app/store";
import {useSelector} from "react-redux";
import Ability from "./Ability";
import {AbilityMetadata} from "../features/abilitiesSlice";
import StatImage from "./images/StatImage";

interface StatMapping {
  title: string;
  icon: string;
  value: number | string;
}

export default function CharacterCard({ c }: { c: CharacterMetadata }) {
  const abilitiesData = useSelector((state: RootState) => state.abilitiesData);
  const initialAbilityMetadatas: AbilityMetadata[] = c.initialAbilitiesMetadataIds
    .map(id => abilitiesData.abilityMetadatas.find(a => a.name === id))
    .flatMap(f => f ? [f] : []);

  const abilities = initialAbilityMetadatas.map(am => <Ability am={am}/>);
  const statMappings: StatMapping[] = [
    {
      title: "Health points",
      icon: "hearts",
      value: c.initialHealthPoints,
    },
    {
      title: `Attack points (${c.attackType})`,
      icon: c.attackType === AttackType.Ranged ? "high-shot" : "gladius",
      value: c.initialAttackPoints,
    },
    {
      title: "Range",
      icon: "arrow-scope",
      value: c.initialBasicAttackRange,
    },
    {
      title: "Speed",
      icon: "wingfoot",
      value: c.initialSpeed,
    },
    {
      title: "Physical defense",
      icon: "shield",
      value: c.initialPsychicalDefense,
    },
    {
      title: "Magical defense",
      icon: "zebra-shield",
      value: c.initialMagicalDefense,
    },
  ];

  return (
    <Grid item>
      <Paper sx={{
        p: 2,
        maxWidth: 200,
      }}>
        <Grid container spacing={2}>
          <Grid item container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={4}>
              <CharacterHexagon name={c.name} width={50}/>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" align="center">
                {c.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center" alignItems="center" spacing={2}>
            {
              statMappings.map(sm => (
                <Grid item xs={4}>
                  <Tooltip title={sm.title} arrow>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <StatImage name={sm.icon} width="20"/>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          {sm.value}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Tooltip>
                </Grid>
              ))
            }
            {/*<Typography variant="body1" align="left">*/}
            {/*  Attack type: {c.attackType}*/}
            {/*</Typography>*/}
            {/*<Typography variant="body1" align="left">*/}
            {/*  Attack points: {c.initialAttackPoints}*/}
            {/*</Typography>*/}
            {/*<Typography variant="body1" align="left">*/}
            {/*  Range: {c.initialBasicAttackRange}*/}
            {/*</Typography>*/}
            {/*<Typography variant="body1" align="left">*/}
            {/*  Speed: {c.initialSpeed}*/}
            {/*</Typography>*/}
            {/*<Typography variant="body1" align="left">*/}
            {/*  Physical defense: {c.initialPsychicalDefense}*/}
            {/*</Typography>*/}
            {/*<Typography variant="body1" align="left">*/}
            {/*  Magical defense: {c.initialMagicalDefense}*/}
            {/*</Typography>*/}
          </Grid>
          <Grid item container justifyContent="center" spacing={1}>
            {abilities}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
