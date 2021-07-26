import React from "react";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@material-ui/core";
import { RootState } from "../app/store";
import { useMountEffect } from "../app/utils";
import axios from "axios";
import { SECRET_URL } from "../app/consts";

function Profile() {
  const authData = useSelector((state: RootState) => state.authData);

  useMountEffect(() => {
    axios
      .get(SECRET_URL, {
        headers: {
          Authorization: "Bearer " + authData.token,
        },
      })
      .then((r) => console.log(r.data))
      .catch((e) => console.log(e));
  });

  return (
    <Paper>
      <Typography variant="h2">Profil</Typography>
      <Typography>{authData.login}</Typography>
      <Typography>{authData.token}</Typography>
    </Paper>
  );
}

export default Profile;
