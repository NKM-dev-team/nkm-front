import Router from "./components/layout/Router";
import BackgroundService from "./components/services/BackgroundService";
import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import { WS_GAME_URL, WS_LOBBY_URL } from "./app/consts";

export default function App() {
  const [connectLobby, setConnectLobby] = useState(true);
  const [connectGame, setConnectGame] = useState(true);

  const lobbyWsHook = useWebSocket(WS_LOBBY_URL, {}, connectLobby);

  const gameWsHook = useWebSocket(WS_GAME_URL, {}, connectGame);

  const refreshLobbyWsConnection = () => {
    setConnectLobby(false);
    setTimeout(() => setConnectLobby(true), 1);
  };

  const refreshGameWsConnection = () => {
    setConnectGame(false);
    setTimeout(() => setConnectGame(true), 1);
  };

  return (
    <>
      <Router
        lobbyWsHook={lobbyWsHook}
        gameWsHook={gameWsHook}
        refreshLobbyWsConnection={refreshLobbyWsConnection}
        refreshGameWsConnection={refreshGameWsConnection}
      />
      <BackgroundService lobbyWsHook={lobbyWsHook} />
    </>
  );
}
