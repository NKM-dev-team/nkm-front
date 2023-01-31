import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import CharacterCard from "../characters_view/CharacterCard";

export default function CharactersView() {
  const charactersData = useSelector(
    (state: RootState) => state.charactersData
  );
  const characterSquares = [...charactersData.characterMetadataList]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => (
      <Grid item key={c.name}>
        <CharacterCard c={c} />
      </Grid>
    ));

  return charactersData.initialized ? (
    <Grid container justifyContent="center" spacing={5} p={2}>
      {characterSquares}
    </Grid>
  ) : (
    <Typography variant="h2">
      Character data is not initialized, please check your internet connection.
    </Typography>
  );
}
