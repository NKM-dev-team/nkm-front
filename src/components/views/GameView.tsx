import React, { useEffect, useMemo, useState } from "react";
import { Alert, Box, Button, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ReadyState } from "react-use-websocket";
import { GameWsHandler } from "../../app/gameWsHandler";
import { GameStateView } from "../../types/game/GameStateView";
import { GameResponseType } from "../../types/game/ws/GameResponseType";
import { RootState } from "../../app/store";
import { Auth } from "../../types/requests/game";
import ReactJson from "react-json-view";
import { TabPanel } from "../TabPanel";
import GameDashboard from "../GameDashboard";
import { GameEventView } from "../../types/game/GameEventView";
import { TitledPaper } from "../TitledPaper";
import CustomSelect from "../CustomSelect";
import { GameRoute } from "../../types/game/ws/GameRoute";
import { WebsocketGameRequest } from "../../types/game/ws/WebsocketGameRequest";
import { routeToRequest } from "../../app/utils";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";

interface GameViewProps {
  gameWsHook: WebSocketHook;
}

export default function GameView({ gameWsHook }: GameViewProps) {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const authData = useSelector((state: RootState) => state.authData);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [eventViews, setEventViews] = React.useState<GameEventView[]>([]);
  const defaultRoute = GameRoute.GetState;
  const [gameState, setGameState] = useState<GameStateView | undefined>(
    undefined
  );
  const [request, setRequest] = React.useState<WebsocketGameRequest>({
    requestPath: defaultRoute,
    requestJson: JSON.stringify({ lobbyId: id }),
  });

  const { sendJsonMessage, lastJsonMessage, readyState } = gameWsHook;

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
      {authData.login ? (
        <TitledPaper title="Request sender" sx={{ m: 1, p: 1 }}>
          <CustomSelect
            options={Object.values(GameRoute)}
            defaultValue={defaultRoute}
            onChange={(e) =>
              setRequest(routeToRequest(gameState, e.target.value as GameRoute))
            }
          ></CustomSelect>

          {request !== undefined ? (
            <ReactJson
              src={request}
              theme="monokai"
              onEdit={(o) => setRequest(o.updated_src as WebsocketGameRequest)}
            />
          ) : null}

          <Button onClick={() => gameWsHandler.sendRequest(request)}>
            Send request
          </Button>
        </TitledPaper>
      ) : null}
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
        <TitledPaper title="Game state view">
          <ReactJson src={gameState} theme="monokai" collapsed={1} />
        </TitledPaper>
      </TabPanel>
    </>
  );
}
