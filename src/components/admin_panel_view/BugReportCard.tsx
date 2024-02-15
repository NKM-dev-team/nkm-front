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
import { RootState } from "../../app/store";
import { useHistory } from "react-router-dom";

interface BugReportCardProps {
  rootState: RootState;
  bugReport: BugReport;
  afterBugReportUpdate: () => void;
}

export default function BugReportCard({
  rootState,
  bugReport,
  afterBugReportUpdate,
}: BugReportCardProps) {
  const [checked, setChecked] = useState<boolean>(bugReport.resolved);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleGameIdClick = () => {
    if (bugReport.gameId) {
      history.push(`/game/${bugReport.gameId}`);
    }
  };

  const handleChange = () => {
    setBugReportResolved(rootState, dispatch, bugReport.id, !checked)
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
            <Tooltip title="Go to the game" placement="top">
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
