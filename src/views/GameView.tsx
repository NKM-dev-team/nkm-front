import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MemoizedHexMapComponent } from "../components/HexMapComponent";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WS_GAME_URL } from "../app/consts";
import { GameWsHandler } from "../app/gameWsHandler";
import { GameStateView } from "../types/game/GameStateView";
import { GameResponseType } from "../types/game/ws/GameResponseType";
import { RootState } from "../app/store";
import { Auth } from "../types/requests/game";

export default function GameView() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const authData = useSelector((state: RootState) => state.authData);

  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(WS_GAME_URL);

  const [gameState, setGameState] = useState<GameStateView | undefined>(
    undefined
  );

  const gameWsHandler = useMemo(
    () =>
      new GameWsHandler(dispatch, sendJsonMessage, (response) => {
        if (response.gameResponseType === GameResponseType.GetState) {
          setGameState(JSON.parse(response.body));
        }
      }),
    [dispatch, sendJsonMessage]
  );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      gameWsHandler.receiveJson(lastJsonMessage);
    }
  }, [lastJsonMessage, gameWsHandler]);

  useEffect(() => {
    if (readyState !== ReadyState.OPEN) return;
    if (!authData.token) return;
    const authRequest: Auth = { token: authData.token };
    gameWsHandler.auth(authRequest);
    gameWsHandler.observe({ lobbyId: id });
    gameWsHandler.getState({ lobbyId: id });
  }, [authData.token, gameWsHandler, id, readyState]);

  if (gameState === undefined)
    return <Alert severity="error">Game not found.</Alert>;

  return (
    <>
      <Box m={3}>
        <Grid container justifyContent="space-between" spacing={10}>
          <Grid item xs={12} md={10}>
            <Typography variant="h5" component="h2" gutterBottom>
              {gameState.id}
            </Typography>
            {gameState.hexMap && (
              <MemoizedHexMapComponent
                scale={1.3}
                hexMap={gameState.hexMap}
                onHexagonClick={(c) => console.log(c.coordinates)}
              />
            )}
          </Grid>
          <Grid item xs={12} md={2}>
            <List>
              {gameState.players.map((player, index) => (
                <ListItem key={index}>
                  <List>
                    <Chip label={player.name} />
                    <Grid container justifyContent="space-between">
                      {/*{player.characters.map((character, i) => (*/}
                      {/*  <Grid item key={i} xs={2}>*/}
                      {/*    <Tooltip title={character.state.name} arrow>*/}
                      {/*      <IconButton size="large"></IconButton>*/}
                      {/*    </Tooltip>*/}
                      {/*  </Grid>*/}
                      {/*))}*/}
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
