import React, { useState } from "react";
import { Alert, Autocomplete, Grid, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import CharacterCard from "../characters_view/CharacterCard";

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

  const characterSquares = characterMetadataListFiltered.map((c) => (
    <Grid item key={c.name}>
      <CharacterCard c={c} />
    </Grid>
  ));

  const handleCharacterNameAutocompleteChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
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
