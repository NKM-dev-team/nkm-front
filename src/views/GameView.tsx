import React from "react";
import {
  Box,
  Chip,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useParams } from "react-router-dom";
import { useMountEffect } from "../app/utils";
import { getGameState } from "../features/gamesSlice";
import { MemoizedHexMapComponent } from "../components/HexMapComponent";

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

  console.log(gameState.hexMap);

  return (
    <>
      <Box m={3}>
        <Paper variant="outlined">
          <Box p={3}>
            <Grid container justify="space-between" spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {gameState.id}
                </Typography>
                {gameState.hexMap && (
                  <MemoizedHexMapComponent
                    scale={0.5}
                    hexMap={gameState.hexMap}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <List>
                  {gameState.players.map((player, index) => (
                    <ListItem key={index}>
                      <Chip label={player.name} />
                      <List>
                        {player.characters.map((character, i) => (
                          <ListItem key={i}>{character.metadataId}</ListItem>
                        ))}
                      </List>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
