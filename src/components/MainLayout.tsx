import React from "react";
import Navbar from "./Navbar";
import { Container } from "@mui/material";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";

interface MainLayoutProps {
  children?: React.ReactNode;
  lobbyWsHook: WebSocketHook;
  gameWsHook: WebSocketHook;
  refreshLobbyWsConnection: () => void;
  refreshGameWsConnection: () => void;
}
export default function MainLayout({
  children,
  lobbyWsHook,
  gameWsHook,
  refreshLobbyWsConnection,
  refreshGameWsConnection,
}: MainLayoutProps) {
  return (
    <>
      <Navbar
        lobbyWsHook={lobbyWsHook}
        gameWsHook={gameWsHook}
        refreshLobbyWsConnection={refreshLobbyWsConnection}
        refreshGameWsConnection={refreshGameWsConnection}
      />
      <Container>
        <>{children}</>
      </Container>
    </>
  );
}
