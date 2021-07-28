import React from "react";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useParams } from "react-router-dom";
import { enqueueNotificationSuccess } from "../features/notificationSlice";
import { joinLobby, leaveLobby } from "../features/lobbiesSlice";

export default function LobbyView() {
  const dispatch = useDispatch();
  const lobbiesData = useSelector((state: RootState) => state.lobbiesData);
  const authData = useSelector((state: RootState) => state.authData);
  const { id } = useParams<{ id: string }>();
  const lobbyState = lobbiesData.lobbyList.find((l) => l.id === id);
  const isHost = lobbyState?.hostUserId === authData.login || false;

  return (
    <>
      {lobbyState === undefined ? (
        <Typography variant="h2">Lobby does not exist</Typography>
      ) : (
        <Box m={3}>
          <Paper variant="outlined">
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
            {authData.login && (
              <>
                {(lobbyState.userIds.includes(authData.login) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(leaveLobby({ lobbyId: id }))}
                  >
                    Leave lobby
                  </Button>
                )) || (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(joinLobby({ lobbyId: id }))}
                  >
                    Join lobby
                  </Button>
                )}
                {isHost && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      dispatch(enqueueNotificationSuccess("It works!"))
                    }
                  >
                    Start the game
                  </Button>
                )}
              </>
            )}
          </Paper>
        </Box>
      )}
    </>
  );
}
