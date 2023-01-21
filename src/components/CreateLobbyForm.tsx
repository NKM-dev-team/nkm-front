import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { LobbyCreation } from "../types/requests/lobby";
import { WS_LOBBY_URL } from "../app/consts";
import useWebSocket from "react-use-websocket";
import { LobbyWsHandler } from "../app/lobbyWsHandler";

function CreateLobbyForm() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const { sendJsonMessage } = useWebSocket(WS_LOBBY_URL, {
    share: true,
  });

  const lobbyWsHandler = useMemo(
    () => new LobbyWsHandler(dispatch, sendJsonMessage),
    [dispatch, sendJsonMessage]
  );

  const onSubmit = (request: LobbyCreation) => {
    lobbyWsHandler.create(request);
  };

  return (
    <Grid container justifyContent="center" p={1}>
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
