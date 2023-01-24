import { Paper, Typography } from "@mui/material";
import React from "react";

interface InfoLabelProps {
  content: any;
}

export function InfoLabel({ content }: InfoLabelProps) {
  return (
    <Typography variant="body2" noWrap>
      {content.toString()}
    </Typography>
  );
}
