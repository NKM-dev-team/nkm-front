import React from "react";
import Navbar from "./Navbar";
import { Alert, Container } from "@mui/material";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { ErrorBoundary } from "react-error-boundary";

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
        <ErrorBoundary
          fallback={
            <Alert severity="error" sx={{ m: 2 }}>
              Something went wrong.
            </Alert>
          }
        >
          <>{children}</>
        </ErrorBoundary>
      </Container>
    </>
  );
}
