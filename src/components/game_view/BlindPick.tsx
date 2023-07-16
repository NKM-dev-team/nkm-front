import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { GameStateView } from "../../types/game/GameStateView";
import CharacterHexagon from "../images/CharacterHexagon";
import { TitledPaper } from "../TitledPaper";
import { BlindPickStateView } from "../../types/game/blindpick/BlindPickStateView";
import { GameWsHandler } from "../../app/gameWsHandler";
import * as GameRequest from "../../types/requests/GameRequest";
import { AuthState } from "../../types/authState";
import { BlindPickPhase } from "../../types/game/blindpick/BlindPickPhase";

interface BlindPickProps {
  gameWsHandler: GameWsHandler;
  gameState: GameStateView;
  authState: AuthState;
}

export default function BlindPick({
  gameWsHandler,
  gameState,
  authState,
}: BlindPickProps) {
  const [selectedCharacters, setSelectedCharacters] = useState<Set<string>>(
    new Set<string>()
  );
  const toggleCharacter = (name: string) => {
    const updatedSet = new Set(selectedCharacters);
    if (selectedCharacters.has(name)) {
      updatedSet.delete(name);
    } else {
      updatedSet.add(name);
    }
    setSelectedCharacters(updatedSet);
  };

  if (!gameState.blindPickState) return null;

  const userId = authState.userState?.userId ?? "";

  const isPlayerInGame = gameState.players.map((p) => p.name).includes(userId);

  const blindPickState: BlindPickStateView = gameState.blindPickState;
  const availableCharacters = Array.from(
    blindPickState.config.availableCharacters
  );

  const availableCharactersSorted = [...availableCharacters].sort();

  const availableCharacterImages = availableCharactersSorted.map(
    (name: string) => (
      <Grid item key={name} xs={4} sm={3} md={2}>
        <Grid container direction="column" spacing={1}>
          <Box display="flex" justifyContent="center">
            <IconButton
              onClick={() => toggleCharacter(name)}
              sx={
                selectedCharacters.has(name) ? { border: "2px solid red" } : {}
              }
            >
              <CharacterHexagon name={name} width={50} />
            </IconButton>
          </Box>
          <Typography
            variant="body2"
            textAlign="center"
            color={selectedCharacters.has(name) ? "#fff" : "#878878"}
          >
            {name}
          </Typography>
        </Grid>
      </Grid>
    )
  );

  const toCharacterImages = (characters: string[]) => {
    if (characters.length <= 0) return null;
    return characters.map((name: string) => (
      <Grid item key={name} xs={2}>
        <Grid container direction="column" spacing={1}>
          <CharacterHexagon name={name} width={30} tooltip={true} />
        </Grid>
      </Grid>
    ));
  };

  const blindPick = () => {
    const request: GameRequest.BlindPickCharacters = {
      lobbyId: gameState.id,
      characterIds: Array.from(selectedCharacters),
    };
    gameWsHandler.blindPickCharacters(request);
  };

  const charactersPickedByCurrentPlayer =
    blindPickState.characterSelection[authState.userState?.userId ?? ""];

  const currentPlayerPickedCharacter =
    charactersPickedByCurrentPlayer !== undefined &&
    Array.from(charactersPickedByCurrentPlayer).length > 0;

  const pickingView = (
    <TitledPaper>
      <Typography variant="h2" align="center">
        Pick {blindPickState.config.numberOfCharactersPerPlayer} character
        {blindPickState.config.numberOfCharactersPerPlayer === 1 ? "" : "s"}
      </Typography>
      <Grid container p={1}>
        <Grid item xs={12} sm={3} p={1}>
          <TitledPaper title="Selected characters">
            <Grid container spacing={1} p={2}>
              {toCharacterImages(Array.from(selectedCharacters))}
            </Grid>
          </TitledPaper>
        </Grid>
        <Grid item xs={12} sm={9} container spacing={1}>
          {availableCharacterImages}
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={blindPick}>
        Pick characters
      </Button>
    </TitledPaper>
  );

  const pickedAndWaitingView = (
    <>
      <Alert severity="info">Waiting for other players to pick...</Alert>
      <Grid container justifyContent="center">
        <TitledPaper title="Characters picked">
          <Grid container spacing={1} p={2}>
            {toCharacterImages(
              charactersPickedByCurrentPlayer
                ? Array.from(charactersPickedByCurrentPlayer)
                : []
            )}
          </Grid>
        </TitledPaper>
      </Grid>
    </>
  );

  const allPickedView = (
    <>
      <Alert severity="info">
        Everyone picked characters, waiting for game start...
      </Alert>
      <Grid container spacing={1} p={2}>
        {Object.keys(blindPickState.characterSelection).map((key) => {
          return (
            <Grid item key={key} xs={12} sm={3}>
              <TitledPaper title={key}>
                <Grid container spacing={1} p={2}>
                  {toCharacterImages(
                    Array.from(blindPickState.characterSelection[key])
                  )}
                </Grid>
              </TitledPaper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );

  if (blindPickState.pickPhase === BlindPickPhase.Picking) {
    if (!isPlayerInGame)
      return <Alert severity="info">Players are blind picking...</Alert>;
    if (currentPlayerPickedCharacter) {
      return pickedAndWaitingView;
    } else {
      return pickingView;
    }
  } else {
    return allPickedView;
  }
}
