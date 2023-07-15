import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { GameStateView } from "../../types/game/GameStateView";
import CharacterHexagon from "../images/CharacterHexagon";
import { TitledPaper } from "../TitledPaper";
import { BlindPickStateView } from "../../types/game/blindpick/BlindPickStateView";
import { GameWsHandler } from "../../app/gameWsHandler";
import * as GameRequest from "../../types/requests/GameRequest";

interface BlindPickProps {
  gameWsHandler: GameWsHandler;
  gameState: GameStateView;
}

export default function BlindPick({
  gameWsHandler,
  gameState,
}: BlindPickProps) {
  // const charactersData = useSelector(
  //   (state: RootState) => state.charactersData
  // );

  // const characterMetadataListSorted = [
  //   ...charactersData.characterMetadataList,
  // ].sort((a, b) => a.name.localeCompare(b.name));

  const [pickedCharacters, setPickedCharacters] = useState<Set<string>>(
    new Set<string>()
  );
  const toggleCharacter = (name: string) => {
    const updatedSet = new Set(pickedCharacters);
    if (pickedCharacters.has(name)) {
      updatedSet.delete(name);
    } else {
      updatedSet.add(name);
    }
    setPickedCharacters(updatedSet);
  };

  if (!gameState.blindPickState) return null;

  const blindPickState: BlindPickStateView = gameState.blindPickState;
  const availableCharacters = Array.from(
    blindPickState.config.availableCharacters
  );

  const availableCharactersSorted = [...availableCharacters].sort();

  const characterImages = availableCharactersSorted.map((name: string) => (
    <Grid item key={name} xs={4} sm={3} md={2}>
      <Grid container direction="column" spacing={1}>
        <Box display="flex" justifyContent="center">
          <IconButton
            onClick={() => toggleCharacter(name)}
            sx={pickedCharacters.has(name) ? { border: "2px solid red" } : {}}
          >
            <CharacterHexagon name={name} width={50} />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          textAlign="center"
          color={pickedCharacters.has(name) ? "#fff" : "#878878"}
        >
          {name}
        </Typography>
      </Grid>
    </Grid>
  ));

  const pickedCharacterImages = Array.from(pickedCharacters).map(
    (name: string) => (
      <Grid item key={name} xs={2}>
        <Grid container direction="column" spacing={1}>
          <CharacterHexagon name={name} width={30} tooltip={true} />
        </Grid>
      </Grid>
    )
  );

  const blindPick = () => {
    const request: GameRequest.BlindPickCharacters = {
      lobbyId: gameState.id,
      characterIds: Array.from(pickedCharacters),
    };
    gameWsHandler.blindPickCharacters(request);
  };

  return (
    <TitledPaper>
      <Typography variant="h2" align="center">
        Pick {blindPickState.config.numberOfCharactersPerPlayer} character{" "}
        {blindPickState.config.numberOfCharactersPerPlayer == 1 ? "" : "s"}
      </Typography>
      <Grid container p={1}>
        <Grid item xs={12} sm={3} p={1}>
          <TitledPaper title="Selected characters">
            <Grid container spacing={1} p={2}>
              {pickedCharacterImages}
            </Grid>
          </TitledPaper>
        </Grid>
        <Grid item xs={12} sm={9} container spacing={1}>
          {characterImages}
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={blindPick}>
        Pick characters
      </Button>
    </TitledPaper>
  );
}
