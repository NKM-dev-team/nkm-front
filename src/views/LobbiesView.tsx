import React from "react";
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
import { RootState } from "../app/store";
import { getAllLobbies } from "../features/lobbiesSlice";
import { Link as RouterLink } from "react-router-dom";
import { useMountEffect } from "../app/utils";
import { LobbyState } from "../types/lobby/LobbyState";
import CreateLobbyForm from "../components/CreateLobbyForm";
import {
  BACKEND_TIME_OFFSET,
  LOBBY_REFRESH_INTERVAL,
  SHOW_LOBBIES_FRESHER_THAN,
} from "../app/consts";

export default function LobbiesView() {
  const lobbiesData = useSelector((state: RootState) => state.lobbiesData);
  const authData = useSelector((state: RootState) => state.authData);
  const dispatch = useDispatch();

  const lobbiesToDisplay = lobbiesData.lobbyList.filter((f) => {
    if (!f.creationDate) return true;
    else {
      return (
        new Date().getTime() - new Date(f.creationDate).getTime() <
        SHOW_LOBBIES_FRESHER_THAN + BACKEND_TIME_OFFSET
      );
    }
  });

  useMountEffect(() => {
    const timer = setInterval(
      () => dispatch(getAllLobbies()),
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

      {authData.login ? <CreateLobbyForm /> : null}
      {lobbiesToDisplay.length === 0 ? (
        <Alert severity="info">No recent lobbies to display.</Alert>
      ) : null}
      <Box m={3}>
        <Grid container justifyContent="space-between" spacing={3}>
          {lobbiesToDisplay.map((lobbyState: LobbyState) => (
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
