import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { BugReport } from "../../features/helper";
import DOMPurify from "dompurify";
import { Switch } from "@mui/material";

interface BugReportCardProps {
  bugReport: BugReport;
}

export default function BugReportCard({ bugReport }: BugReportCardProps) {
  const [checked, setChecked] = useState<boolean>(bugReport.resolved);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <>
      <Grid container flexDirection="column" overflow="auto">
        <Card variant="outlined">
          <CardContent>
            <Typography>{bugReport.creatorIdOpt ?? "Anonymous"}</Typography>
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
