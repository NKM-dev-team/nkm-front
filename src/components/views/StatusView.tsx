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
  VERSION_URL_STABLE,
} from "../../app/consts";
import { useMountEffect } from "../../app/utils";

export default function StatusView() {
  const versionData = useSelector((state: RootState) => state.versionData);

  const [githubServerVersion, setGithubServerVersion] = useState("unknown");
  const [stableServerVersion, setStableServerVersion] = useState("unknown");
  const [serverRunning, setServerRunning] = useState<boolean | undefined>(
    undefined
  );

  useMountEffect(() => {
    axios.get(GITHUB_SERVER_MASTER_HEAD_URL).then((res) => {
      const version = res.data.object.sha;
      setGithubServerVersion(version);
    });

    axios.get(VERSION_URL_STABLE).then((res) => {
      const version = res.data;
      setStableServerVersion(version);
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
