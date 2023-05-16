import React, { useState } from "react";
import { Box, Grid, Link, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import axios from "axios";
import {
  GITHUB_SERVER_COMMIT_URL,
  GITHUB_SERVER_COMMITS_URL,
  GITHUB_SERVER_MASTER_HEAD_URL,
  VERSION_URL,
} from "../../app/consts";
import { useMountEffect } from "../../app/utils";

export default function StatusView() {
  const versionData = useSelector((state: RootState) => state.versionData);
  const hexmapsData = useSelector((state: RootState) => state.hexMapData);
  const charactersData = useSelector(
    (state: RootState) => state.charactersData
  );
  const abilitiesData = useSelector((state: RootState) => state.abilitiesData);
  const lobbiesData = useSelector((state: RootState) => state.lobbiesData);

  const [githubServerVersion, setGithubServerVersion] = useState("unknown");
  const [serverRunning, setServerRunning] = useState<boolean | undefined>(
    undefined
  );

  const miniStatusXs = 6;

  useMountEffect(() => {
    axios.get(GITHUB_SERVER_MASTER_HEAD_URL).then((res) => {
      const version = res.data.object.sha;
      setGithubServerVersion(version);
    });

    axios
      .get(VERSION_URL)
      .then((res) => {
        setServerRunning(res.status === 200);
      })
      .catch(() => {
        setServerRunning(false);
      });
  });

  return (
    <Paper variant="outlined" sx={{ p: 2, margin: 2 }}>
      <Grid container justifyContent="center" spacing={2} p={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              backgroundColor:
                serverRunning === undefined
                  ? "yellow"
                  : serverRunning
                  ? "green"
                  : "red",
            }}
          >
            Server status
          </Box>
        </Grid>
        <Grid item xs={12}>
          {versionData.version ? (
            <>
              <Typography>Detected version on the server:</Typography>
              <Paper sx={{ p: 2 }}>
                <Link
                  target="_blank"
                  href={GITHUB_SERVER_COMMIT_URL(versionData.version)}
                >
                  {versionData.version}
                </Link>
              </Paper>
            </>
          ) : (
            <Typography>"Error with version detection."</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography>Latest version on github:</Typography>
          <Paper sx={{ p: 2 }}>
            <Link
              target="_blank"
              href={GITHUB_SERVER_COMMIT_URL(githubServerVersion)}
            >
              {githubServerVersion}
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
        <Grid item xs={miniStatusXs}>
          <Box
            sx={{
              p: 2,
              backgroundColor: hexmapsData.initialized ? "green" : "red",
            }}
          >
            HexMaps metadata
          </Box>
        </Grid>
        <Grid item xs={miniStatusXs}>
          <Box
            sx={{
              p: 2,
              backgroundColor: charactersData.initialized ? "green" : "red",
            }}
          >
            Characters metadata
          </Box>
        </Grid>
        <Grid item xs={miniStatusXs}>
          <Box
            sx={{
              p: 2,
              backgroundColor: abilitiesData.initialized ? "green" : "red",
            }}
          >
            Abilities metadata
          </Box>
        </Grid>
        <Grid item xs={miniStatusXs}>
          <Box
            sx={{
              p: 2,
              backgroundColor: lobbiesData.initialized ? "green" : "red",
            }}
          >
            Lobbies
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
