import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Auth, LobbyCreation } from "../types/requests/lobby";
import { getAllLobbies } from "../features/lobbiesSlice";
import { WS_LOBBY_URL } from "../app/consts";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WebsocketLobbyResponse } from "../types/lobby/ws/WebsocketLobbyResponse";
import { enqueueNotificationError } from "../features/notificationSlice";
import { LobbyResponseType } from "../types/lobby/ws/LobbyResponseType";
import { WebsocketLobbyRequest } from "../types/lobby/ws/WebsocketLobbyRequest";
import { LobbyRoute } from "../types/lobby/ws/LobbyRoute";
import { RootState } from "../app/store";

function CreateLobbyForm() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_LOBBY_URL,
    {
      share: true,
      retryOnError: true,
      reconnectInterval: 1000,
      reconnectAttempts: 10,
    }
  );

  const authData = useSelector((state: RootState) => state.authData);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const onSubmit = (request: LobbyCreation) => {
    const wsRequest: WebsocketLobbyRequest = {
      requestPath: LobbyRoute.CreateLobby,
      requestJson: JSON.stringify(request),
    };
    sendJsonMessage(wsRequest);
    dispatch(getAllLobbies());
  };

  useEffect(() => {
    if (!authData.token) {
      // TODO: remove auth on the WS
    }
  }, [authData.token]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      const authRequest: Auth = {
        token: authData.token ?? "",
      };
      const wsRequest: WebsocketLobbyRequest = {
        requestPath: LobbyRoute.Auth,
        requestJson: JSON.stringify(authRequest),
      };

      sendJsonMessage(wsRequest);
    }
  }, [connectionStatus, authData.token, readyState, sendJsonMessage]);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const m = lastJsonMessage as WebsocketLobbyResponse;
      if (m.lobbyResponseType === LobbyResponseType.Error) {
        dispatch(enqueueNotificationError(m.body));
      } else if (m.statusCode !== 200) {
        dispatch(
          enqueueNotificationError(
            `Request failed with status code ${m.statusCode}`
          )
        );
      }
    }
  }, [lastJsonMessage, dispatch]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography>WS status: {connectionStatus}</Typography>
      </Grid>
      <Grid item>
        <Paper style={{ position: "relative", zIndex: 0 }}>
          <Box p={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    name="name"
                    inputRef={register({ required: true })}
                    error={errors.name}
                    autoFocus
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    Create lobby
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CreateLobbyForm;
