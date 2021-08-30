import React from "react";
import {
  Box,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useParams } from "react-router-dom";
import { useMountEffect } from "../app/utils";
import { getGameState, placeCharacter } from "../features/gamesSlice";
import { MemoizedHexMapComponent } from "../components/HexMapComponent";
import DraggableCharacterHexagon from "../components/DraggableCharacterHexagon";

export default function GameView() {
  const dispatch = useDispatch();
  const gamesData = useSelector((state: RootState) => state.gamesData);
  // const hexMapData = useSelector((state: RootState) => state.hexMapData);
  // const authData = useSelector((state: RootState) => state.authData);
  const { id } = useParams<{ id: string }>();
  const gameState = gamesData.gameList.find((g) => g.id === id);

  const checkTimeout = 1000;
  useMountEffect(() => {
    const timer = setInterval(() => {
      dispatch(getGameState(id));
    }, checkTimeout);
    return () => clearTimeout(timer);
  });

  if (gameState === undefined)
    return <Typography variant="h2">Game does not exist</Typography>;

  return (
    <>
      <Box m={3}>
        <Grid container justify="space-between" spacing={10}>
          <Grid item xs={12} md={10}>
            <Typography variant="h5" component="h2" gutterBottom>
              {gameState.id}
            </Typography>
            {gameState.hexMap && (
              <MemoizedHexMapComponent
                scale={1.3}
                hexMap={gameState.hexMap}
                onHexagonClick={(c) => console.log(c.coordinates)}
                onHexagonCharacterDrop={(c, characterId) => {
                  dispatch(
                    placeCharacter({
                      characterId: characterId,
                      gameId: id,
                      hexCoordinates: c.coordinates,
                    })
                  );
                  console.log("Dropped " + JSON.stringify(c.coordinates));
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={2}>
            <List>
              {gameState.players.map((player, index) => (
                <ListItem key={index}>
                  <List>
                    <Chip label={player.name} />
                    <Grid container justify="space-between">
                      {player.characters.map((character, i) => (
                        <Grid item key={i} xs={2}>
                          <Tooltip title={character.state.name} arrow>
                            <IconButton>
                              <DraggableCharacterHexagon
                                name={character.metadataId}
                                width={20}
                                characterId={character.id}
                              />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      ))}
                    </Grid>
                  </List>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
