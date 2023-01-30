import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { LobbyCreation } from "../types/requests/LobbyRequest";
import { LobbyWsHandler } from "../app/lobbyWsHandler";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";

function CreateLobbyForm({ lobbyWsHook }: { lobbyWsHook: WebSocketHook }) {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const { sendJsonMessage } = lobbyWsHook;

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
