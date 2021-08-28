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
import { useParams, useHistory } from "react-router-dom";
import {
  getLobby,
  joinLobby,
  leaveLobby,
  setHexMapName,
  setNumberOfBans,
  setNumberOfCharactersPerPlayer,
  setPickType,
  startGame,
} from "../features/lobbiesSlice";
import Star from "@material-ui/icons/Star";
import { useMountEffect } from "../app/utils";
import CustomSelect from "../components/CustomSelect";
import { PickType } from "../types/PickType";
import CustomSlider from "../components/CustomSlider";
import { GamePhase, getGameState } from "../features/gamesSlice";

export default function LobbyView() {
  const dispatch = useDispatch();
  const history = useHistory();
  const lobbiesData = useSelector((state: RootState) => state.lobbiesData);
  const gamesData = useSelector((state: RootState) => state.gamesData);
  const hexMapData = useSelector((state: RootState) => state.hexMapData);
  const authData = useSelector((state: RootState) => state.authData);
  const { id } = useParams<{ id: string }>();
  const lobbyState = lobbiesData.lobbyList.find((l) => l.id === id);
  const gameState = gamesData.gameList.find((g) => g.id === id);

  const [chosenHexMapName, setChosenHexMapName] = useState<string>(
    lobbyState?.chosenHexMapName || hexMapData?.hexMapList[0].name
  );

  const [chosenPickType, setChosenPickType] = useState<PickType>(
    lobbyState?.pickType || PickType.AllRandom
  );

  const [
    chosenCharactersPerPlayer,
    setChosenCharactersPerPlayer,
  ] = useState<number>(lobbyState?.numberOfCharactersPerPlayer || 2);

  const [chosenBans, setChosenBans] = useState<number>(
    lobbyState?.numberOfBans || 0
  );

  const isHost = lobbyState?.hostUserId === authData.login || false;
  const isGameNotStarted = gameState?.gamePhase === GamePhase.NotStarted;
  const areInputsDisabled = !isHost || !isGameNotStarted;

  const checkTimeout = 1000;
  useMountEffect(() => {
    const timer = setInterval(() => {
      dispatch(getLobby(id));
      dispatch(getGameState(id));
    }, checkTimeout);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (!isHost) return;
    if (chosenHexMapName == null) return;
    if (lobbyState?.chosenHexMapName === chosenHexMapName) return;
    dispatch(setHexMapName({ hexMapName: chosenHexMapName, lobbyId: id }));
  }, [chosenHexMapName, dispatch, id, lobbyState?.chosenHexMapName, isHost]);

  useEffect(() => {
    if (!isHost) return;
    if (lobbyState?.pickType === chosenPickType) return;
    dispatch(setPickType({ lobbyId: id, pickType: chosenPickType }));
  }, [chosenPickType, dispatch, id, lobbyState?.pickType, isHost]);

  useEffect(() => {
    if (!isHost) return;
    if (lobbyState?.numberOfCharactersPerPlayer === chosenCharactersPerPlayer)
      return;
    dispatch(
      setNumberOfCharactersPerPlayer({
        charactersPerPlayer: chosenCharactersPerPlayer,
        lobbyId: id,
      })
    );
  }, [
    chosenCharactersPerPlayer,
    dispatch,
    id,
    lobbyState?.numberOfCharactersPerPlayer,
    isHost,
  ]);

  useEffect(() => {
    if (!isHost) return;
    if (lobbyState?.numberOfBans === chosenBans) return;
    dispatch(
      setNumberOfBans({
        numberOfBans: chosenBans,
        lobbyId: id,
      })
    );
  }, [chosenBans, dispatch, id, lobbyState?.numberOfBans, isHost]);

  if (hexMapData.hexMapList.length <= 0)
    return (
      <Typography variant="h2">
        HexMaps not initialized. Please reload the page and try again.
      </Typography>
    );

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
                  label="Mapa"
                  options={hexMapData.hexMapList.map((h) => h.name)}
                  value={
                    lobbyState.chosenHexMapName || hexMapData.hexMapList[0].name
                  }
                  onChange={(e) => setChosenHexMapName(e.target.value)}
                  disabled={areInputsDisabled}
                />
                <CustomSelect
                  label="Tryb wybierania postaci"
                  options={Object.values(PickType)}
                  value={lobbyState.pickType}
                  onChange={(e) =>
                    setChosenPickType(
                      PickType[e.target.value as keyof typeof PickType]
                    )
                  }
                  disabled={areInputsDisabled}
                />
                <CustomSlider
                  label="Liczba postaci na gracza"
                  defaultValue={chosenCharactersPerPlayer}
                  step={1}
                  marks
                  onChangeCommitted={(e, v) => {
                    setChosenCharactersPerPlayer(v as number);
                  }}
                  min={1}
                  max={8}
                  value={lobbyState.numberOfCharactersPerPlayer}
                  valueLabelDisplay="on"
                  disabled={areInputsDisabled}
                />

                {lobbyState.pickType === PickType.DraftPick && (
                  <CustomSlider
                    label="Liczba banów na gracza"
                    defaultValue={chosenBans}
                    step={1}
                    marks
                    onChangeCommitted={(e, v) => {
                      setChosenBans(v as number);
                    }}
                    min={0}
                    max={5}
                    value={lobbyState.numberOfBans}
                    valueLabelDisplay="on"
                    disabled={areInputsDisabled}
                  />
                )}
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
                {isHost && isGameNotStarted && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(startGame({ lobbyId: id }))}
                  >
                    Start the game
                  </Button>
                )}
                {!isGameNotStarted && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push(`/game/${id}`)}
                  >
                    Go to the game
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
