import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { createLobby, LobbyState } from "../../features/lobbiesSlice";
import { useForm } from "react-hook-form";
import { LobbyCreationRequest } from "../../types/lobby";

export default function LobbiesView() {
  const lobbiesData = useSelector((state: RootState) => state.lobbiesData);
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (request: LobbyCreationRequest) => {
    dispatch(createLobby(request));
  };
  return (
    <>
      <Grid container justify="center">
        <Paper style={{ position: "relative", zIndex: 0 }}>
          <Box p={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Nazwa"
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
                    Stwórz pokój
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Grid>
      {/*<Button onClick={() => createLobby()}>*/}
      {lobbiesData.lobbyList.length === 0 ? (
        <Typography>No lobbies created yet</Typography>
      ) : (
        ""
      )}
      {lobbiesData.lobbyList.map((lobbyState: LobbyState) => (
        <div key={lobbyState.id}>
          <Typography>{lobbyState.id}</Typography>
          <Typography>{lobbyState.name}</Typography>
          <Typography>{lobbyState.hostUserId}</Typography>
          <Typography>{lobbyState.creationDate}</Typography>
          <Typography>{lobbyState.userIds.join(" ")}</Typography>
        </div>
      ))}
    </>
  );
}
