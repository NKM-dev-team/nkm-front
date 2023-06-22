import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useHistory, useParams } from "react-router-dom";
import Star from "@mui/icons-material/Star";
import CustomSelect from "../CustomSelect";
import { PickType } from "../../types/game/PickType";
import CustomSlider from "../CustomSlider";
import { LobbyWsHandler } from "../../app/lobbyWsHandler";
import { useMountEffect } from "../../app/utils";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { LobbyState } from "../../types/lobby/LobbyState";
import { LobbyResponseType } from "../../types/lobby/ws/LobbyResponseType";
import { ReadyState } from "react-use-websocket";
import { Auth } from "../../types/requests/GameRequest";

interface LobbyViewProps {
  lobbyWsHook: WebSocketHook;
}

export default function LobbyView({ lobbyWsHook }: LobbyViewProps) {
  const dispatch = useDispatch();

  const history = useHistory();
  const hexMapData = useSelector((state: RootState) => state.hexMapData);
  const authData = useSelector((state: RootState) => state.authData);
  const { id } = useParams<{ id: string }>();

  const [lobbyState, setLobbyState] = useState<LobbyState | undefined>(
    undefined
  );

  const { sendJsonMessage, lastJsonMessage, readyState } = lobbyWsHook;

  const lobbyWsHandler = useMemo(
    () =>
      new LobbyWsHandler(dispatch, sendJsonMessage, (response) => {
        switch (response.lobbyResponseType) {
          case LobbyResponseType.Lobby:
            const ls: LobbyState = JSON.parse(response.body);
            setLobbyState(ls);
            break;
        }
      }),
    [dispatch, sendJsonMessage]
  );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      lobbyWsHandler.receiveJson(lastJsonMessage);
    }
  }, [lastJsonMessage, lobbyWsHandler]);

  useEffect(() => {
    if (readyState !== ReadyState.OPEN) return;
    if (authData.token) {
      const authRequest: Auth = { token: authData.token };
      lobbyWsHandler.auth(authRequest);
    }
    lobbyWsHandler.observe({ lobbyId: id });
    lobbyWsHandler.getLobby({ lobbyId: id });
  }, [authData.token, lobbyWsHandler, id, readyState]);

  const [chosenHexMapName, setChosenHexMapName] = useState<string | undefined>(
    lobbyState?.chosenHexMapName || hexMapData?.hexMapList.find((x) => x)?.name
  );

  const [chosenPickType, setChosenPickType] = useState<PickType>(
    lobbyState?.pickType || PickType.AllRandom
  );

  const [chosenCharactersPerPlayer, setChosenCharactersPerPlayer] =
    useState<number>(lobbyState?.numberOfCharactersPerPlayer || 2);

  const [chosenBans, setChosenBans] = useState<number>(
    lobbyState?.numberOfBans || 0
  );

  const isHost = lobbyState?.hostUserId === authData.email || false;
  const areInputsDisabled = !isHost || lobbyState?.gameStarted;

  useMountEffect(() => {
    lobbyWsHandler.observe({ lobbyId: id });
  });

  useEffect(() => {
    if (!isHost) return;
    if (chosenHexMapName === undefined) return;
    if (lobbyState?.chosenHexMapName === chosenHexMapName) return;

    lobbyWsHandler.setHexMap({ lobbyId: id, hexMapName: chosenHexMapName });
  }, [
    chosenHexMapName,
    id,
    isHost,
    lobbyState?.chosenHexMapName,
    lobbyWsHandler,
  ]);

  useEffect(() => {
    if (!isHost) return;
    if (lobbyState?.pickType === chosenPickType) return;
    lobbyWsHandler.setPickType({ lobbyId: id, pickType: chosenPickType });
  }, [chosenPickType, id, isHost, lobbyState?.pickType, lobbyWsHandler]);

  useEffect(() => {
    if (!isHost) return;
    if (lobbyState?.numberOfCharactersPerPlayer === chosenCharactersPerPlayer)
      return;
    lobbyWsHandler.setNumberOfCharactersPerPlayer({
      lobbyId: id,
      charactersPerPlayer: chosenCharactersPerPlayer,
    });
  }, [
    chosenCharactersPerPlayer,
    id,
    isHost,
    lobbyState?.numberOfCharactersPerPlayer,
    lobbyWsHandler,
  ]);

  useEffect(() => {
    if (!isHost) return;
    if (lobbyState?.numberOfBans === chosenBans) return;
    lobbyWsHandler.setNumberOfBans({
      lobbyId: id,
      numberOfBans: chosenBans,
    });
  }, [chosenBans, id, isHost, lobbyState?.numberOfBans, lobbyWsHandler]);

  const joinLobby = () => {
    lobbyWsHandler.join({ lobbyId: id });
  };
  const leaveLobby = () => {
    lobbyWsHandler.leave({ lobbyId: id });
  };
  const startGame = () => {
    if (!isHost) return;
    lobbyWsHandler.startGame({ lobbyId: id });
  };

  if (hexMapData.hexMapList.length <= 0)
    return <Alert severity="error">HexMaps are not initialized.</Alert>;

  if (lobbyState === undefined)
    return <Alert severity="error">Lobby not found.</Alert>;

  return (
    <>
      <Box m={3}>
        <Paper variant="outlined">
          <Box p={3}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {lobbyState.name}
                </Typography>
                <Typography>{lobbyState.hostUserId}</Typography>
                <Typography color="textSecondary">
                  {lobbyState.creationDate?.toString()}
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
                  label="Map"
                  options={hexMapData.hexMapList.map((h) => h.name)}
                  value={
                    lobbyState.chosenHexMapName || hexMapData.hexMapList[0].name
                  }
                  onChange={(e) => setChosenHexMapName(e.target.value)}
                  disabled={areInputsDisabled}
                />
                <CustomSelect
                  label="Pick type"
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
                  label="Number of characters per player"
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
                    label="Number of bans per player"
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
            {authData.email && (
              <>
                {(lobbyState.userIds.includes(authData.email) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={leaveLobby}
                  >
                    Leave lobby
                  </Button>
                )) || (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={joinLobby}
                  >
                    Join lobby
                  </Button>
                )}
                {isHost && !lobbyState.gameStarted && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={startGame}
                  >
                    Start the game
                  </Button>
                )}
                {lobbyState.gameStarted && (
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
