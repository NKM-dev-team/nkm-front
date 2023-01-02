import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import CharacterCard from "../components/CharacterCard";

export default function CharactersView() {
  const charactersData = useSelector((state: RootState) => state.charactersData);
  const characterSquares = charactersData.characterMetadataList
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => (
    <CharacterCard c={c} key={c.name}/>
  ));

  return (
    <Grid container justifyContent="center" spacing={5} p={2}>
      {characterSquares}
    </Grid>
  );
}
