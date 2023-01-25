import { Paper, Typography } from "@mui/material";
import React from "react";

interface TitledPaperProps {
  children?: React.ReactNode;
  title?: string;
  [x: string]: any;
}

export function TitledPaper(props: TitledPaperProps) {
  const { children, title, ...other } = props;

  return (
    <Paper variant="outlined" sx={{ p: 1 }} {...other}>
      <Typography>{title}</Typography>
      {children}
    </Paper>
  );
}
