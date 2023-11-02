import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, Grid, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { LobbyWsHandler } from "../../app/lobbyWsHandler";
import { useMountEffect } from "../../app/utils";
import axios from "axios";
import { LOGIN_URL, WS_GAME_URL, WS_LOBBY_URL } from "../../app/consts";
import { LobbyResponseType } from "../../types/lobby/ws/LobbyResponseType";
import useWebSocket from "react-use-websocket";
import { PickType } from "../../types/game/PickType";
import { GameWsHandler } from "../../app/gameWsHandler";
import { AuthState, RequestStatus } from "../../types/authState";
import LobbyView from "../views/LobbyView";
import GameView from "../views/GameView";
import useNkmUnity from "../../app/useNkmUnity";
import { Unity } from "react-unity-webgl";

export default function InteractiveTestView() {
  const dispatch = useDispatch();

  // create new hooks, so we don't interfere with shared hook auth
  const lobbyWsHook = useWebSocket(WS_LOBBY_URL);
  const gameWsHook = useWebSocket(WS_GAME_URL);

  const [authState1, setAuthState1] = useState<AuthState>({
    token: null,
    userState: null,
    loginRequestStatus: RequestStatus.None,
    registerRequestStatus: RequestStatus.None,
  });
  const [authState2, setAuthState2] = useState<AuthState>({
    token: null,
    userState: null,
    loginRequestStatus: RequestStatus.None,
    registerRequestStatus: RequestStatus.None,
  });

  const nkmUnity1 = useNkmUnity();
  const nkmUnity2 = useNkmUnity();

  const [gameId, setGameId] = useState<string | null>(null);
  const [pickType, setPickType] = useState<PickType>(PickType.BlindPick);
  const [initializingLobby, setInitializingLobby] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [actingAs, setActingAs] = useState<string | null>(null);

  const testUser1Label = "TEST USER 1";
  const testUser2Label = "TEST USER 2";

  const mockAuthState = actingAs === testUser1Label ? authState1 : authState2;

  const lobbyWsHandler = useMemo(
    () =>
      new LobbyWsHandler(
        dispatch,
        lobbyWsHook.sendJsonMessage,
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
    [dispatch, lobbyWsHook.sendJsonMessage]
  );

  const gameWsHandler = useMemo(
    () =>
      new GameWsHandler(dispatch, gameWsHook.sendJsonMessage, () => {}, true),
    [dispatch, gameWsHook.sendJsonMessage]
  );

  useEffect(() => {
    if (lobbyWsHook.lastJsonMessage !== null) {
      lobbyWsHandler.receiveJson(lobbyWsHook.lastJsonMessage);
    }
  }, [lobbyWsHook.lastJsonMessage, lobbyWsHandler]);

  useEffect(() => {
    if (gameWsHook.lastJsonMessage !== null) {
      gameWsHandler.receiveJson(gameWsHook.lastJsonMessage);
    }
  }, [gameWsHook.lastJsonMessage, gameWsHandler]);

  useMountEffect(() => {
    axios
      .post(LOGIN_URL, {
        email: "test1@example.com",
        password: "test",
      })
      .then((response) => {
        if (response.status === 200) {
          setAuthState1(response.data);
        }
      });

    axios
      .post(LOGIN_URL, {
        email: "test2@example.com",
        password: "test",
      })
      .then((response) => {
        if (response.status === 200) {
          setAuthState2(response.data);
        }
      });
  });

  const token1 = authState1.token;
  const token2 = authState2.token;

  const initUnityCreds = () => {
    if (!authState1.token || !authState1.userState) return;
    if (!authState2.token || !authState2.userState) return;
    nkmUnity1.login({
      token: authState1.token,
      userState: authState1.userState,
    });
    nkmUnity2.login({
      token: authState2.token,
      userState: authState2.userState,
    });
  };

  // TODO refactor into one method??
  const actAsTestUser1 = useCallback(() => {
    const authData = authState1;
    if (!authData.token || !authData.userState) return;

    lobbyWsHandler.auth({ token: authData.token });
    gameWsHandler.auth({ token: authData.token });

    setActingAs(testUser1Label);
  }, [authState1, lobbyWsHandler, gameWsHandler]);

  const actAsTestUser2 = useCallback(() => {
    const authData = authState2;
    if (!authData.token || !authData.userState) return;

    lobbyWsHandler.auth({ token: authData.token });
    gameWsHandler.auth({ token: authData.token });

    setActingAs(testUser2Label);
  }, [authState2, lobbyWsHandler, gameWsHandler]);

  const createBlindPick = () => {
    createNewLobby(PickType.BlindPick);
  };
  const createDraftPick = () => {
    createNewLobby(PickType.DraftPick);
  };

  const createAllRandom = () => {
    createNewLobby(PickType.AllRandom);
  };

  const createNewLobby = (pickType: PickType) => {
    if (!token1) return;
    if (!token2) return;

    setGameId(null);
    setGameStarted(false);
    setPickType(pickType);

    initUnityCreds();

    actAsTestUser1();
    lobbyWsHandler.create({ name: "Auto created test game from Admin panel" });
    setInitializingLobby(true);
  };

  useEffect(() => {
    if (!token1) return;
    if (!token2) return;
    if (!gameId) return;

    actAsTestUser2();
    lobbyWsHandler.join({ lobbyId: gameId });
    lobbyWsHandler.auth({ token: token1 });
    actAsTestUser1();
    lobbyWsHandler.setHexMap({ lobbyId: gameId, hexMapName: "TestMap" });
    lobbyWsHandler.setPickType({
      lobbyId: gameId,
      pickType: pickType,
    });
    lobbyWsHandler.setNumberOfCharactersPerPlayer({
      lobbyId: gameId,
      charactersPerPlayer: 2,
    });
    lobbyWsHandler.setClockConfig({
      lobbyId: gameId,
      newConfig: {
        initialTimeMillis: 1000 * 60 * 60,
        incrementMillis: 5000,
        maxBanTimeMillis: 61000,
        maxPickTimeMillis: 61000,
        timeAfterPickMillis: 10000,
        timeForCharacterPlacing: 1000 * 60 * 60,
      },
    });
    lobbyWsHandler.startGame({ lobbyId: gameId });
  }, [
    gameId,
    initializingLobby,
    token1,
    token2,
    lobbyWsHandler,
    actAsTestUser1,
    actAsTestUser2,
  ]);

  useEffect(() => {
    if (!gameStarted) return;
    if (!gameId) return;

    nkmUnity1.loadGame(gameId);
    nkmUnity2.loadGame(gameId);
  }, [gameStarted]);

  if (!token1 || !token2) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Test user tokens not loaded.
      </Alert>
    );
  }

  return (
    <>
      <Alert severity="info">
        Admin panel uses separate websocket connections.
      </Alert>

      <Typography>Acting as {actingAs ?? "nobody."}</Typography>
      <Paper variant="outlined" sx={{ p: 2, margin: 2 }}>
        <Grid container spacing={2} p={1}>
          {token1 ? (
            <Grid item xs={12} sm={6}>
              <Button onClick={actAsTestUser1}>Act as test user 1</Button>
            </Grid>
          ) : null}

          {token2 ? (
            <Grid item xs={12} sm={6}>
              <Button onClick={actAsTestUser2}>Act as test user 2</Button>
            </Grid>
          ) : null}
        </Grid>
        <Grid container spacing={2} p={1}>
          <Grid item xs={12} sm={6}>
            <Button onClick={createBlindPick}>Create blind pick</Button>
            <Button onClick={createDraftPick}>Create draft pick</Button>
            <Button onClick={createAllRandom}>Create all random</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button onClick={initUnityCreds}>
              Initialize unity credentials
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Unity
        unityProvider={nkmUnity1.unityContextHook.unityProvider}
        style={{ width: 1024, height: 576 }}
        key={nkmUnity1.unityKey}
      />
      <Unity
        unityProvider={nkmUnity2.unityContextHook.unityProvider}
        style={{ width: 1024, height: 576 }}
        key={nkmUnity2.unityKey}
      />
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
          authState={mockAuthState}
          autoAuth={false}
        ></GameView>
      ) : null}
    </>
  );
}
