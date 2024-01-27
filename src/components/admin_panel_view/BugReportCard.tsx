import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { BugReport, setBugReportResolved } from "../../features/helper";
import DOMPurify from "dompurify";
import { useDispatch } from "react-redux";
import { AuthState } from "../../types/authState";
import { useClipboard } from "use-clipboard-copy";

interface BugReportCardProps {
  authState: AuthState;
  bugReport: BugReport;
  afterBugReportUpdate: () => void;
}

export default function BugReportCard({
  authState,
  bugReport,
  afterBugReportUpdate,
}: BugReportCardProps) {
  const [checked, setChecked] = useState<boolean>(bugReport.resolved);
  const dispatch = useDispatch();
  const clipboard = useClipboard();

  const handleGameIdClick = () => {
    if (bugReport.gameId) {
      clipboard.copy(bugReport.gameId);
    }
  };

  const handleChange = () => {
    setBugReportResolved(authState, dispatch, bugReport.id, !checked)
      .then(() => {
        setChecked(!checked);
        afterBugReportUpdate();
      })
      .catch();
  };
  return (
    <>
      <Grid container flexDirection="column" overflow="auto">
        <Card variant="outlined">
          <CardContent>
            <Typography>{bugReport.creatorIdOpt ?? "Anonymous"}</Typography>
            <Tooltip title="Click to copy Game ID" placement="top">
              <Typography
                color="textSecondary"
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#6a7bdb", // example color
                  textDecoration: "underline",
                }}
                onClick={handleGameIdClick}
              >
                {bugReport.gameId ?? "Game ID not available"}
              </Typography>
            </Tooltip>
            <Typography color="textSecondary">
              {bugReport.creationDate}
            </Typography>
            <Typography color="secondary">
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    bugReport.description.replaceAll("\n", "<br>")
                  ),
                }}
              />
            </Typography>
          </CardContent>
          <FormControlLabel
            value="start"
            control={
              <Switch
                color="secondary"
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Resolved:"
            labelPlacement="start"
          />
        </Card>
      </Grid>
    </>
  );
}
