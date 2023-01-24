import React, { useEffect, useMemo, useState } from "react";
import { Alert, Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WS_GAME_URL } from "../../app/consts";
import { GameWsHandler } from "../../app/gameWsHandler";
import { GameStateView } from "../../types/game/GameStateView";
import { GameResponseType } from "../../types/game/ws/GameResponseType";
import { RootState } from "../../app/store";
import { Auth } from "../../types/requests/game";
import ReactJson from "react-json-view";
import { TabPanel } from "../TabPanel";
import GameDashboard from "../GameDashboard";
import { GameEventView } from "../../types/game/GameEventView";

export default function GameView() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const authData = useSelector((state: RootState) => state.authData);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [eventViews, setEventViews] = React.useState<GameEventView[]>([]);

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
        if (response.gameResponseType === GameResponseType.Event) {
          setEventViews((es) => es.concat(JSON.parse(response.body)));
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
          aria-label="basic tabs example"
        >
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="JSON explorer" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <GameDashboard gameState={gameState} incomingEventViews={eventViews} />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Paper variant="outlined" sx={{ p: 1 }}>
          <Typography>Game state view</Typography>
          <ReactJson src={gameState} theme="monokai" collapsed={1} />
        </Paper>
      </TabPanel>
    </>
  );
}
