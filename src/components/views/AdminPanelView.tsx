import React, { useEffect, useMemo, useState } from "react";
import { Alert, Button, Grid, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { LobbyWsHandler } from "../../app/lobbyWsHandler";
import { useMountEffect } from "../../app/utils";
import axios from "axios";
import { LOGIN_URL, WS_GAME_URL, WS_LOBBY_URL } from "../../app/consts";
import { LobbyResponseType } from "../../types/lobby/ws/LobbyResponseType";
import LobbyView from "./LobbyView";
import useWebSocket from "react-use-websocket";
import { PickType } from "../../types/game/PickType";
import GameView from "./GameView";

export default function AdminPanelView() {
  const dispatch = useDispatch();

  // create new hooks so we don't interfere with shared hook auth
  const lobbyWsHook = useWebSocket(WS_LOBBY_URL);
  const gameWsHook = useWebSocket(WS_GAME_URL);

  const { sendJsonMessage, lastJsonMessage } = lobbyWsHook;

  const [token1, setToken1] = useState<string | null>(null);
  const [token2, setToken2] = useState<string | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [initializingLobby, setInitializingLobby] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const lobbyWsHandler = useMemo(
    () =>
      new LobbyWsHandler(
        dispatch,
        sendJsonMessage,
        (response) => {
          switch (response.lobbyResponseType) {
            case LobbyResponseType.CreateLobby:
              setGameId(response.body);
              break;
            case LobbyResponseType.StartGame:
              setGameStarted(true);
              break;
          }
        },
        true
      ),
    [dispatch, sendJsonMessage]
  );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      lobbyWsHandler.receiveJson(lastJsonMessage);
    }
  }, [lastJsonMessage, lobbyWsHandler]);

  useMountEffect(() => {
    axios
      .post(LOGIN_URL, {
        email: "test1@example.com",
        password: "test",
      })
      .then((response) => {
        if (response.status === 200) {
          setToken1(response.data.token);
        }
      });

    axios
      .post(LOGIN_URL, {
        email: "test2@example.com",
        password: "test",
      })
      .then((response) => {
        if (response.status === 200) {
          setToken2(response.data.token);
        }
      });
  });

  const createTestGame = () => {
    if (!token1) return;
    if (!token2) return;

    setGameId(null);
    setGameStarted(false);

    lobbyWsHandler.auth({ token: token1 });
    lobbyWsHandler.create({ name: "Auto created test game from Admin panel" });
    setInitializingLobby(true);
  };

  useEffect(() => {
    if (!token1) return;
    if (!token2) return;
    if (!gameId) return;

    lobbyWsHandler.auth({ token: token2 });
    lobbyWsHandler.join({ lobbyId: gameId });
    lobbyWsHandler.auth({ token: token1 });
    lobbyWsHandler.setHexMap({ lobbyId: gameId, hexMapName: "1v1v1" });
    lobbyWsHandler.setPickType({
      lobbyId: gameId,
      pickType: PickType.BlindPick,
    });
    lobbyWsHandler.startGame({ lobbyId: gameId });
  }, [gameId, initializingLobby, token1, token2, lobbyWsHandler]);

  if (!token1 || !token2) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Test user tokens not loaded.
      </Alert>
    );
  }

  return (
    <>
      <Paper variant="outlined" sx={{ p: 2, margin: 2 }}>
        <Grid container spacing={2} p={1}>
          <Grid item xs={12} sm={6}>
            <Button onClick={createTestGame}>Fast create test game</Button>
          </Grid>
        </Grid>
      </Paper>
      {gameId ? (
        <LobbyView
          lobbyWsHook={lobbyWsHook}
          id={gameId}
          autoInitAsHost={false}
          autoAuth={false}
        ></LobbyView>
      ) : null}
      {gameId && gameStarted ? (
        <GameView
          gameWsHook={gameWsHook}
          id={gameId}
          autoAuth={false}
        ></GameView>
      ) : null}
    </>
  );
}
