import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import HexMapsView from "../views/HexMapsView";
import LobbiesView from "../views/LobbiesView";
import { Routes } from "../../types/Routes";
import MainLayout from "./MainLayout";
import HomeView from "../views/HomeView";
import CharactersView from "../views/CharactersView";
import StatusView from "../views/StatusView";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import AdminPanelView from "../views/AdminPanelView";
import LobbyViewParam from "../views/LobbyViewParam";
import GameViewParam from "../views/GameViewParam";
import ReleaseView from "../views/ReleaseView";
import SettingsView from "../views/SettingsView";

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
      component: <LobbyViewParam lobbyWsHook={lobbyWsHook} />,
    },
    {
      path: Routes.GAME,
      component: <GameViewParam gameWsHook={gameWsHook} />,
    },
    // {
    //   path: Routes.USER,
    //   component: authData.email ? <Profile /> : <Redirect to="/" />,
    // },
    {
      path: Routes.SETTINGS,
      component: <SettingsView />,
    },
    {
      path: Routes.ADMIN,
      component: authData.userState?.isAdmin ? (
        <AdminPanelView />
      ) : (
        <Redirect to="/" />
      ),
    },
    {
      path: Routes.RELEASE,
      component: authData.userState?.isAdmin ? (
        <ReleaseView />
      ) : (
        <Redirect to="/" />
      ),
    },
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
