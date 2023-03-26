import React from "react";
import Navbar from "./Navbar";
import { Alert, Box, Container, CssBaseline } from "@mui/material";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { ErrorBoundary } from "react-error-boundary";
import LeftDrawer from "./LeftDrawer";
import { DRAWER_WIDTH } from "../../app/consts";

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
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <LeftDrawer open={drawerOpen} setOpen={setDrawerOpen} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Navbar
          lobbyWsHook={lobbyWsHook}
          gameWsHook={gameWsHook}
          refreshLobbyWsConnection={refreshLobbyWsConnection}
          refreshGameWsConnection={refreshGameWsConnection}
          setDrawerOpen={setDrawerOpen}
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
      </Box>
    </Box>
  );
}
