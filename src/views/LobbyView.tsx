import React from "react";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useParams } from "react-router-dom";

export default function LobbyView() {
  const lobbiesData = useSelector((state: RootState) => state.lobbiesData);
  const { id } = useParams<{ id: string }>();
  const lobbyState = lobbiesData.lobbyList.find((l) => l.id === id);
  return (
    <>
      {lobbyState === undefined ? (
        <Typography variant="h2">Lobby does not exist</Typography>
      ) : (
        <Box m={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {lobbyState.name}
              </Typography>
              <Typography>{lobbyState.hostUserId}</Typography>
              <Typography color="textSecondary">
                {lobbyState.creationDate}
              </Typography>
              <Typography color="secondary">
                {lobbyState.userIds.join(" ") || "Empty lobby"}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}
