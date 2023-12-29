import React, { useEffect, useState } from "react";
import { Box, Grid, Link, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import axios from "axios";
import {
  GET_GAME_STATE_URL,
  GET_LOBBIES_URL,
  GET_LOBBY_URL,
  GITHUB_SERVER_COMMIT_URL,
  GITHUB_SERVER_COMMITS_URL,
  GITHUB_SERVER_MASTER_HEAD_URL,
  VERSION_URL,
  VERSION_URL_STABLE,
} from "../../app/consts";
import { useMountEffect } from "../../app/utils";
import { LobbyState } from "../../types/lobby/LobbyState";

interface HealthCheckBoxProps {
  label: string;
  backgroundColor: string;
}

function HealthCheckBox({ label, backgroundColor }: HealthCheckBoxProps) {
  return (
    <Grid item md={3} xs={6}>
      <Box
        sx={{
          p: 2,
          backgroundColor: backgroundColor,
        }}
      >
        {label}
      </Box>
    </Grid>
  );
}

export default function StatusView() {
  const versionData = useSelector((state: RootState) => state.versionData);

  const [githubServerVersion, setGithubServerVersion] =
    useState<string>("unknown");
  const [stableServerVersion, setStableServerVersion] =
    useState<string>("unknown");
  const [serverRunning, setServerRunning] = useState<boolean | undefined>(
    undefined
  );
  const [getLobbiesRunning, setGetLobbiesRunning] = useState<
    boolean | undefined
  >(undefined);

  const [someGameId, setSomeGameId] = useState<string | undefined>(undefined);

  const [getLobbyStateRunning, setGetLobbyStateRunning] = useState<
    boolean | undefined
  >(undefined);

  const [getGameStateRunning, setGetGameStateRunning] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    if (someGameId === undefined) return;
    axios
      .get(GET_LOBBY_URL(someGameId))
      .then((res) => {
        if (res.status === 200) {
          setGetLobbyStateRunning(true);
        }
      })
      .catch(() => {
        setGetLobbyStateRunning(false);
      });

    axios
      .get(GET_GAME_STATE_URL(someGameId))
      .then((res) => {
        if (res.status === 200) {
          setGetGameStateRunning(true);
        }
      })
      .catch(() => {
        setGetGameStateRunning(false);
      });
  }, [someGameId]);

  useMountEffect(() => {
    axios
      .get(GET_LOBBIES_URL)
      .then((res) => {
        if (res.status === 200) {
          const lobbies: LobbyState[] = res.data;
          setGetLobbiesRunning(true);
          if (lobbies) {
            setSomeGameId(lobbies[0].id);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
        setGetLobbiesRunning(false);
      });

    axios.get(GITHUB_SERVER_MASTER_HEAD_URL).then((res) => {
      const version = res.data.object.sha;
      setGithubServerVersion(version);
    });

    axios
      .get(VERSION_URL_STABLE)
      .then((res) => {
        if (res.status === 200 && res.data.length === 40) {
          const version = res.data;
          setStableServerVersion(version);
        } else {
          console.error("stable version undefined");
        }
      })
      .catch((e) => {
        console.warn(e);
      });

    axios
      .get(VERSION_URL)
      .then((res) => {
        setServerRunning(res.status === 200 && res.data.length === 40);
      })
      .catch((e) => {
        console.warn(e);
        setServerRunning(false);
      });
  });

  const statusToColor = (status: boolean | undefined) => {
    switch (status) {
      case true:
        return "green";
      case false:
        return "red";
      case undefined:
        return "yellow";
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, margin: 2 }}>
      <Grid container justifyContent="center" spacing={2} p={1}>
        <Typography>Health check:</Typography>
        <Grid container justifyContent="center" spacing={2} p={1}>
          <HealthCheckBox
            label="Server status (latest)"
            backgroundColor={statusToColor(serverRunning)}
          />
          <HealthCheckBox
            label="Lobbies"
            backgroundColor={statusToColor(getLobbiesRunning)}
          />
          <HealthCheckBox
            label="Lobby State"
            backgroundColor={statusToColor(getLobbyStateRunning)}
          />
          <HealthCheckBox
            label="Game State"
            backgroundColor={statusToColor(getGameStateRunning)}
          />
        </Grid>
        <Grid item xs={12}>
          {versionData.version ? (
            <>
              <Typography>Detected version on the server (latest):</Typography>
              <Paper sx={{ p: 2 }}>
                <Link
                  target="_blank"
                  href={GITHUB_SERVER_COMMIT_URL(versionData.version)}
                >
                  {versionData.version.substring(0, 10)}
                </Link>
              </Paper>
            </>
          ) : (
            <Typography>"Error with version detection."</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography>Detected version on the server (stable):</Typography>
          <Paper sx={{ p: 2 }}>
            <Link
              target="_blank"
              href={GITHUB_SERVER_COMMIT_URL(stableServerVersion)}
            >
              {stableServerVersion.substring(0, 10)}
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography>Latest version on github:</Typography>
          <Paper sx={{ p: 2 }}>
            <Link
              target="_blank"
              href={GITHUB_SERVER_COMMIT_URL(githubServerVersion)}
            >
              {githubServerVersion.substring(0, 10)}
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <>
              You can view all of the commits here:{" "}
              <Link target="_blank" href={GITHUB_SERVER_COMMITS_URL}>
                {GITHUB_SERVER_COMMITS_URL}
              </Link>
            </>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
