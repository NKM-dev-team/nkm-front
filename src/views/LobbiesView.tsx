import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  getAllLobbies,
  LobbyState,
} from "../features/lobbiesSlice";
import { Link as RouterLink } from "react-router-dom";
import { useMountEffect } from "../app/utils";

export default function LobbiesView() {
  const lobbiesData = useSelector((state: RootState) => state.lobbiesData);
  const dispatch = useDispatch();

  const checkTimeout = 1000;
  useMountEffect(() => {
    const timer = setInterval(() => dispatch(getAllLobbies()), checkTimeout);
    return () => clearTimeout(timer);
  });

  return <>
    {lobbiesData.lobbyList.length === 0 ? (
      <Typography>No lobbies created yet</Typography>
    ) : (
      ""
    )}
    <Box m={3}>
      <Grid container justifyContent="space-between" spacing={3}>
        {lobbiesData.lobbyList.map((lobbyState: LobbyState) => (
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
                    {lobbyState.userIds.join(" ") || "Empty lobby"}
                  </Typography>
                </CardContent>
              </Card>
            </RouterLink>
          </Grid>
        ))}
      </Grid>
    </Box>
  </>;
}
