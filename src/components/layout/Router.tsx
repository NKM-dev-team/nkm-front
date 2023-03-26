import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import HexMapsView from "../views/HexMapsView";
import { RootState } from "../../app/store";
import Profile from "../views/Profile";
import LobbiesView from "../views/LobbiesView";
import { Routes } from "../../types/Routes";
import MainLayout from "./MainLayout";
import HomeView from "../views/HomeView";
import CharactersView from "../views/CharactersView";
import GameView from "../views/GameView";
import StatusView from "../views/StatusView";
import LobbyView from "../views/LobbyView";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";

interface RouterProps {
  lobbyWsHook: WebSocketHook;
  gameWsHook: WebSocketHook;
  refreshLobbyWsConnection: () => void;
  refreshGameWsConnection: () => void;
}

function Router({
  lobbyWsHook,
  gameWsHook,
  refreshLobbyWsConnection,
  refreshGameWsConnection,
}: RouterProps) {
  const authData = useSelector((state: RootState) => state.authData);

  const routes = [
    {
      path: Routes.STATUS,
      component: <StatusView />,
    },
    {
      path: Routes.HEXMAPS,
      component: <HexMapsView />,
    },
    {
      path: Routes.CHARACTERS,
      component: <CharactersView />,
    },
    {
      path: Routes.LOBBIES,
      component: <LobbiesView lobbyWsHook={lobbyWsHook} />,
    },
    {
      path: Routes.LOBBY,
      component: <LobbyView lobbyWsHook={lobbyWsHook} />,
    },
    {
      path: Routes.GAME,
      component: <GameView gameWsHook={gameWsHook} />,
    },
    // {
    //   path: Routes.USER,
    //   component: authData.login ? <Profile /> : <Redirect to="/" />,
    // },
    {
      path: Routes.HOME,
      component: <HomeView />,
    },
  ];

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        {routes.map((route) => (
          <Route key={1} path={route.path}>
            <MainLayout
              lobbyWsHook={lobbyWsHook}
              gameWsHook={gameWsHook}
              refreshLobbyWsConnection={refreshLobbyWsConnection}
              refreshGameWsConnection={refreshGameWsConnection}
            >
              {route.component}
            </MainLayout>
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
