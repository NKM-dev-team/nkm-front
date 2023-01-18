import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { LobbyCreation } from "../types/requests/lobby";
import { getAllLobbies } from "../features/lobbiesSlice";
import { WS_LOBBY_URL } from "../app/consts";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WebsocketLobbyResponse } from "../types/lobby/ws/WebsocketLobbyResponse";
import {
  enqueueNotificationError,
  enqueueNotificationInfo,
} from "../features/notificationSlice";
import { LobbyResponseType } from "../types/lobby/ws/LobbyResponseType";

function CreateLobbyForm() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(WS_LOBBY_URL);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const onSubmit = (request: LobbyCreation) => {
    sendJsonMessage(request);
    dispatch(getAllLobbies());
  };

  useEffect(() => {
    console.log(connectionStatus);
    if (lastJsonMessage !== null) {
      const m = lastJsonMessage as WebsocketLobbyResponse;
      if (m.lobbyResponseType === LobbyResponseType.Error) {
        dispatch(enqueueNotificationError(m.body));
      } else if (m.body) {
        dispatch(enqueueNotificationInfo(m.body));
      }
    }
  }, [lastJsonMessage, connectionStatus]);

  return (
    <Grid container justifyContent="center">
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
  );
}

export default CreateLobbyForm;
