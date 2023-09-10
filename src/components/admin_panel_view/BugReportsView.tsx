import React, { useState } from "react";
import { ListItem, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useMountEffect } from "../../app/utils";
import { BugReport, fetchBugReports } from "../../features/helper";
import { AuthState } from "../../types/authState";
import BugReportCard from "./BugReportCard";

export interface BugReportsViewProps {
  authState: AuthState;
}

export default function BugReportsView({ authState }: BugReportsViewProps) {
  const dispatch = useDispatch();
  const [bugReports, setBugReports] = useState<BugReport[]>([]);

  useMountEffect(() => {
    fetchBugReports(authState, dispatch).then(setBugReports);
  });

  return (
    <>
      <Typography>Bug Reports</Typography>

      {bugReports.map((b, i) => {
        return (
          <ListItem key={i}>
            <BugReportCard bugReport={b} />
          </ListItem>
        );
      })}
    </>
  );
}
