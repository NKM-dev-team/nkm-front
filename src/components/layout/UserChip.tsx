import { Chip } from "@mui/material";
import React from "react";

interface UserChipProps {
  username: string;
}

export function UserChip({ username }: UserChipProps) {
  return (
    <Chip
      label={username}
      color="primary"
      variant="outlined"
      sx={{ width: 100 }}
    />
  );
}
