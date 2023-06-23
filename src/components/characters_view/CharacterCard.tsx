import React from "react";
import { CardActionArea, Grid, Paper, Typography } from "@mui/material";
import CharacterHexagon from "../images/CharacterHexagon";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import Ability from "./Ability";
import { createSelector } from "@reduxjs/toolkit";
import { CharacterMetadata } from "../../types/game/character/CharacterMetadata";
import CharacterStats from "./CharacterStats";
import DetailedCharacterInfo from "./DetailedCharacterInfo";
import CustomDialog from "../CustomDialog";

export default function CharacterCard({ c }: { c: CharacterMetadata }) {
  const [open, setOpen] = React.useState(false);
  const selectAbilitiesData = (state: RootState) => state.abilitiesData;
  const selectInitialAbilityMetadatas = createSelector(
    selectAbilitiesData,
    (abilitiesData) => {
      return c.initialAbilitiesMetadataIds
        .map((id) => abilitiesData.abilityMetadatas.find((a) => a.name === id))
        .flatMap((f) => (f ? [f] : []));
    }
  );
  const selectAbilities = createSelector(
    selectInitialAbilityMetadatas,
    (initialAbilityMetadatas) => {
      return initialAbilityMetadatas.map((am) => (
        <Ability am={am} key={am.name} />
      ));
    }
  );

  const abilities = useSelector(selectAbilities);

  return (
    <>
      <CardActionArea onClick={() => setOpen(true)}>
        <Paper
          sx={{
            p: 2,
            maxWidth: 200,
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={4}>
                <CharacterHexagon name={c.name} width={50} />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6" align="center">
                  {c.name}
                </Typography>
              </Grid>
            </Grid>
            <CharacterStats c={c} />
            <Grid item container justifyContent="center" spacing={1}>
              {abilities}
            </Grid>
          </Grid>
        </Paper>
      </CardActionArea>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        title={c.name}
        content={<DetailedCharacterInfo c={c} />}
      />
    </>
  );
}
