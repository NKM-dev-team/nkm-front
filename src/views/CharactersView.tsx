import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import CharacterCard from "../components/CharacterCard";

export default function CharactersView() {
  const charactersData = useSelector(
    (state: RootState) => state.charactersData
  );
  const characterSquares = charactersData.characterMetadataList.map((c) => (
    <CharacterCard c={c} />
  ));

  return (
    <Grid container justify="center" spacing={2}>
      {characterSquares}
    </Grid>
  );
}
