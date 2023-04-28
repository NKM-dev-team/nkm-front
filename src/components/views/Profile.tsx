import React from "react";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@mui/material";
import { RootState } from "../../app/store";

function Profile() {
  const authData = useSelector((state: RootState) => state.authData);

  return (
    <Paper>
      <Typography variant="h2">Profil</Typography>
      <Typography variant="h4">Hello, {authData.email} :)</Typography>
    </Paper>
  );
}

export default Profile;
