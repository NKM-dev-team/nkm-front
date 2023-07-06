import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link as RouterLink } from "react-router-dom";
import { useMountEffect } from "../../app/utils";
import { LobbyState } from "../../types/lobby/LobbyState";
import CreateLobbyForm from "../lobbies_view/CreateLobbyForm";
import {
  BACKEND_TIME_OFFSET,
  LOBBY_REFRESH_INTERVAL,
  SHOW_LOBBIES_FRESHER_THAN,
} from "../../app/consts";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { LobbyWsHandler } from "../../app/lobbyWsHandler";
import { LobbyResponseType } from "../../types/lobby/ws/LobbyResponseType";
interface LobbiesViewProps {
  lobbyWsHook: WebSocketHook;
}

export default function LobbiesView({ lobbyWsHook }: LobbiesViewProps) {
  const authData = useSelector((state: RootState) => state.authData);
  const dispatch = useDispatch();

  const [lobbiesState, setLobbiesState] = useState<LobbyState[] | undefined>(
    undefined
  );

  const { sendJsonMessage, lastJsonMessage } = lobbyWsHook;

  const lobbyWsHandler = useMemo(
    () =>
      new LobbyWsHandler(dispatch, sendJsonMessage, (response) => {
        console.log(response.lobbyResponseType);
        switch (response.lobbyResponseType) {
          case LobbyResponseType.Lobbies:
            const lss: LobbyState[] = JSON.parse(response.body);
            setLobbiesState(lss);
            break;
        }
      }),
    [dispatch, sendJsonMessage]
  );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      lobbyWsHandler.receiveJson(lastJsonMessage);
    }
  }, [lastJsonMessage, lobbyWsHandler]);

  const lobbiesToDisplay = lobbiesState?.filter((f) => {
    if (!f.creationDate) return true;
    return (
      new Date().getTime() - new Date(f.creationDate).getTime() <
      SHOW_LOBBIES_FRESHER_THAN + BACKEND_TIME_OFFSET
    );
  });

  useMountEffect(() => {
    lobbyWsHandler.getLobbies();

    const timer = setInterval(
      () => lobbyWsHandler.getLobbies(),
      LOBBY_REFRESH_INTERVAL
    );
    return () => clearTimeout(timer);
  });

  return (
    <>
      <Alert severity="warning" sx={{ m: 2 }}>
        <AlertTitle>Disclaimer</AlertTitle>
        This is a web NKM interface used for testing. You should use the
        interface from the Unity game frontend to play.
      </Alert>

      {authData.token ? <CreateLobbyForm lobbyWsHook={lobbyWsHook} /> : null}
      {(lobbiesToDisplay?.length || 0) === 0 ? (
        <Alert severity="info">No recent lobbies to display.</Alert>
      ) : null}
      <Box m={3}>
        <Grid container justifyContent="space-between" spacing={3}>
          {lobbiesToDisplay?.map((lobbyState: LobbyState) => (
            <Grid item key={lobbyState.id}>
              <RouterLink to={"/lobby/" + lobbyState.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {lobbyState.name}
                    </Typography>
                    <Typography>{lobbyState.hostUserId}</Typography>
                    <Typography color="textSecondary">
                      {lobbyState.creationDate?.toString()}
                    </Typography>
                    <Typography color="secondary">
                      {lobbyState.userIds?.join(" ") || "Empty lobby"}
                    </Typography>
                  </CardContent>
                </Card>
              </RouterLink>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
