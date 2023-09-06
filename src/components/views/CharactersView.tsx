import React, { useEffect, useState } from "react";
import { Alert, Autocomplete, Grid, Skeleton, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import CharacterCard from "../characters_view/CharacterCard";
import { jsx } from "@emotion/react";
import JSX = jsx.JSX;
import { useMountEffect } from "../../app/utils";

export default function CharactersView() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );

  const charactersData = useSelector(
    (state: RootState) => state.charactersData
  );

  const characterMetadataListSorted = [
    ...charactersData.characterMetadataList,
  ].sort((a, b) => a.name.localeCompare(b.name));

  const characterMetadataListFiltered =
    selectedCharacter !== null
      ? characterMetadataListSorted.filter((c) => c.name === selectedCharacter)
      : characterMetadataListSorted;

  const skeletonCharacters = [...Array(20).keys()].map((i) => {
    return (
      <Grid item key={i}>
        <Skeleton variant="rectangular" width={200} height={233} />
      </Grid>
    );
  });

  const [characterSquares, setCharacterSquares] =
    useState<JSX.Element[]>(skeletonCharacters);

  useMountEffect(() => {
    const cs = characterMetadataListFiltered.map((c) => (
      <Grid item key={c.name}>
        <CharacterCard c={c} />
      </Grid>
    ));
    setTimeout(() => setCharacterSquares(cs), 0);
  });

  const handleCharacterNameAutocompleteChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    console.log(value);
    setSelectedCharacter(value);
  };

  return charactersData.initialized ? (
    <>
      <Autocomplete
        options={characterMetadataListSorted.map((c) => c.name)}
        value={selectedCharacter}
        onChange={handleCharacterNameAutocompleteChange}
        renderInput={(params) => (
          <TextField {...params} label="SEARCH" variant="outlined" />
        )}
        sx={{ p: 2 }}
      />
      <Grid container justifyContent="center" spacing={3} p={2}>
        {characterSquares}
      </Grid>
    </>
  ) : (
    <Alert severity="error">
      Character data is not initialized, please check your internet connection.
    </Alert>
  );
}
