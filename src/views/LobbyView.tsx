import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useParams } from "react-router-dom";
import { enqueueNotificationSuccess } from "../features/notificationSlice";
import {
  getLobby,
  joinLobby,
  leaveLobby,
  setHexMapName,
  setPickType,
} from "../features/lobbiesSlice";
import Star from "@material-ui/icons/Star";
import { useMountEffect } from "../app/utils";
import CustomSelect from "../components/CustomSelect";
import { PickType } from "../types/PickType";

export default function LobbyView() {
  const dispatch = useDispatch();
  const lobbiesData = useSelector((state: RootState) => state.lobbiesData);
  const hexMapData = useSelector((state: RootState) => state.hexMapData);
  const authData = useSelector((state: RootState) => state.authData);
  const { id } = useParams<{ id: string }>();
  const lobbyState = lobbiesData.lobbyList.find((l) => l.id === id);

  const [chosenHexMapName, setChosenHexMapName] = useState<string>(
    lobbyState?.chosenHexMapName || hexMapData.hexMapList[0].name
  );

  const [chosenPickType, setChosenPickType] = useState<PickType>(
    lobbyState?.pickType || PickType.AllRandom
  );

  const isHost = lobbyState?.hostUserId === authData.login || false;

  const checkTimeout = 1000;
  useMountEffect(() => {
    const timer = setInterval(() => dispatch(getLobby(id)), checkTimeout);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (chosenHexMapName == null) return;
    if (lobbyState?.chosenHexMapName === chosenHexMapName) return;
    dispatch(setHexMapName({ hexMapName: chosenHexMapName, lobbyId: id }));
  }, [chosenHexMapName, dispatch, id, lobbyState?.chosenHexMapName]);

  useEffect(() => {
    if (lobbyState?.pickType === chosenPickType) return;
    dispatch(setPickType({ lobbyId: id, pickType: chosenPickType }));
  }, [chosenPickType, dispatch, id, lobbyState?.pickType]);

  if (lobbyState === undefined)
    return <Typography variant="h2">Lobby does not exist</Typography>;

  return (
    <>
      <Box m={3}>
        <Paper variant="outlined">
          <Box p={3}>
            <Grid container justify="space-between" spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {lobbyState.name}
                </Typography>
                <Typography>{lobbyState.hostUserId}</Typography>
                <Typography color="textSecondary">
                  {lobbyState.creationDate}
                </Typography>
                <List>
                  {lobbyState.userIds.map((id, index) => (
                    <ListItem key={index}>
                      <Chip label={id} />
                      {id === lobbyState.hostUserId && (
                        <Star color="secondary" />
                      )}
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelect
                  label="Wybór mapy"
                  options={hexMapData.hexMapList.map((h) => h.name)}
                  value={
                    lobbyState.chosenHexMapName || hexMapData.hexMapList[0].name
                  }
                  onChange={(e) => setChosenHexMapName(e.target.value)}
                  disabled={!isHost}
                />
                <CustomSelect
                  label="Wybór trybu wybierania postaci"
                  options={Object.values(PickType)}
                  value={lobbyState.pickType}
                  onChange={(e) =>
                    setChosenPickType(
                      PickType[e.target.value as keyof typeof PickType]
                    )
                  }
                  disabled={!isHost}
                />
              </Grid>
            </Grid>
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
          </Box>
        </Paper>
      </Box>
    </>
  );
}
