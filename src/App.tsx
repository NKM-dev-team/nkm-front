import Router from "./components/layout/Router";
import BackgroundService from "./components/services/BackgroundService";
import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import { useNkmApi } from "./app/useNkmApi";

export default function App() {
  const nkmApi = useNkmApi();
  const [connectLobby, setConnectLobby] = useState(true);
  const [connectGame, setConnectGame] = useState(true);

  const lobbyWsHook = useWebSocket(nkmApi.WS_LOBBY_URL, {}, connectLobby);

  const gameWsHook = useWebSocket(nkmApi.WS_GAME_URL, {}, connectGame);

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
      <BackgroundService />
    </>
  );
}
