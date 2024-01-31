import React, { useState } from "react";
import {
  Alert,
  FormControlLabel,
  Grid,
  ListItem,
  Switch,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useMountEffect } from "../../app/utils";
import { BugReport, fetchBugReports } from "../../features/helper";
import { AuthState } from "../../types/authState";
import BugReportCard from "./BugReportCard";
import CachedIcon from "@mui/icons-material/Cached";
import IconButton from "@mui/material/IconButton";
import { RootState } from "../../app/store";

export interface BugReportsViewProps {
  authState: AuthState;
}

export default function BugReportsView({ authState }: BugReportsViewProps) {
  const rootState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [bugReports, setBugReports] = useState<BugReport[]>([]);
  const [showResolved, setShowResolved] = useState<boolean>(false);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  const refresh = (): void => {
    fetchBugReports(rootState, dispatch).then(setBugReports).catch();
  };

  useMountEffect(refresh);

  const afterBugReportUpdate = (): void => {
    if (autoRefresh) {
      refresh();
    }
  };

  const displayedBugReports = bugReports.filter(
    (b) => !b.resolved || showResolved
  );

  return (
    <>
      <Grid container justifyContent="space-around">
        <Grid item>
          <FormControlLabel
            value="start"
            control={
              <Switch
                checked={showResolved}
                onChange={() => setShowResolved(!showResolved)}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Show Resolved:"
            labelPlacement="start"
          />
          <Tooltip
            title="Download all bug reports when you manually change any of them"
            arrow
          >
            <FormControlLabel
              value="start"
              control={
                <Switch
                  checked={autoRefresh}
                  onChange={() => setAutoRefresh(!autoRefresh)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Auto Refresh:"
              labelPlacement="start"
            />
          </Tooltip>
        </Grid>

        <Grid item>
          <Tooltip title="Refresh" arrow>
            <IconButton
              edge="end"
              color="inherit"
              onClick={refresh}
              aria-label="refresh"
            >
              <CachedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      {displayedBugReports.length > 0 ? (
        displayedBugReports.map((b) => {
          return (
            <ListItem key={b.id}>
              <BugReportCard
                rootState={rootState}
                bugReport={b}
                afterBugReportUpdate={afterBugReportUpdate}
              />
            </ListItem>
          );
        })
      ) : (
        <Alert severity="info">No bug reports to display.</Alert>
      )}
    </>
  );
}
