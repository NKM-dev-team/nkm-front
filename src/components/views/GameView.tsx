import React, { useEffect, useMemo, useState } from "react";
import { Alert, Box, Tab, Tabs } from "@mui/material";
import { useDispatch } from "react-redux";
import { ReadyState } from "react-use-websocket";
import { GameWsHandler } from "../../app/gameWsHandler";
import { GameStateView } from "../../types/game/GameStateView";
import { GameResponseType } from "../../types/game/ws/GameResponseType";
import { Auth } from "../../types/requests/GameRequest";
import ReactJson from "react-json-view";
import { TabPanel } from "../TabPanel";
import GameDashboard from "../game_view/GameDashboard";
import { GameEventView } from "../../types/game/GameEventView";
import { TitledPaper } from "../TitledPaper";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { Clock } from "../../types/game/Clock";
import RequestSender from "../game_view/RequestSender";
import GameUI from "../game_view/GameUI";
import { AuthState } from "../../types/authState";

interface GameViewProps {
  gameWsHook: WebSocketHook;
  id: string;
  authState: AuthState;
  autoAuth?: boolean;
}

export default function GameView({
  gameWsHook,
  id,
  authState,
  autoAuth = true,
}: GameViewProps) {
  const dispatch = useDispatch();

  const authData = authState;

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [eventViews, setEventViews] = React.useState<GameEventView[]>([]);
  const [gameState, setGameState] = useState<GameStateView | undefined>(
    undefined
  );

  const [lastClock, setLastClock] = useState(gameState?.clock);

  const { sendJsonMessage, lastJsonMessage, readyState } = gameWsHook;

  const gameWsHandler = useMemo(
    () =>
      new GameWsHandler(dispatch, sendJsonMessage, (response) => {
        if (response.gameResponseType === GameResponseType.GetState) {
          const gs: GameStateView = JSON.parse(response.body);
          setGameState(gs);
          setLastClock(gs.clock);
        }
        if (response.gameResponseType === GameResponseType.Event) {
          setEventViews((es) => es.concat(JSON.parse(response.body)));
        }
        if (response.gameResponseType === GameResponseType.GetCurrentClock) {
          const clock: Clock = JSON.parse(response.body);
          setLastClock(clock);
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
    if (!autoAuth) return;
    if (readyState !== ReadyState.OPEN) return;
    if (!authData.token) return;
    const authRequest: Auth = { token: authData.token };
    gameWsHandler.auth(authRequest);
  }, [authData.token, gameWsHandler, id, readyState, autoAuth]);

  useEffect(() => {
    gameWsHandler.observe({ lobbyId: id });
  }, [gameWsHandler, id]);

  useEffect(() => {
    gameWsHandler.getState({ lobbyId: id });
  }, [gameWsHandler, id, eventViews]);

  useEffect(() => {
    if (gameState !== undefined) {
      gameWsHandler.getCurrentClock({ lobbyId: id });
    }
  }, [id, eventViews, gameWsHandler, gameState]);

  if (gameState === undefined)
    return <Alert severity="error">Game not found.</Alert>;

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => {
            setSelectedTab(newValue);
          }}
        >
          <Tab label="Game UI" {...a11yProps(0)} />
          <Tab label="Dashboard" {...a11yProps(1)} />
          <Tab label="JSON explorer" {...a11yProps(2)} />
          {authData.token ? (
            <Tab label="Request sender" {...a11yProps(3)} />
          ) : null}
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <GameUI
          gameWsHandler={gameWsHandler}
          gameState={gameState}
          authState={authState}
          lastClock={lastClock ?? gameState.clock}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <GameDashboard
          gameState={gameState}
          incomingEventViews={eventViews}
          lastClock={lastClock ?? gameState.clock}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <TitledPaper title="Game state json view">
          <ReactJson src={gameState} theme="monokai" collapsed={1} />
        </TitledPaper>
      </TabPanel>
      {authData.token ? (
        <TabPanel value={selectedTab} index={3}>
          <RequestSender gameWsHandler={gameWsHandler} gameState={gameState} />
        </TabPanel>
      ) : null}
    </>
  );
}
