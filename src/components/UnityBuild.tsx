import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { AuthResponse } from "../types/AuthResponse";
import useNkmUnity from "../app/useNkmUnity";

export default function UnityBuild() {
  const { isUnityStopped, startUnity, quitUnity, login, renderUnityComponent } =
    useNkmUnity();

  const authData = useSelector((state: RootState) => state.authData);
  const canInjectCredentials = !!authData.token && !!authData.userState;

  const injectCredentials = () => {
    if (!authData.token || !authData.userState) return;

    let resp: AuthResponse = {
      token: authData.token,
      userState: authData.userState,
    };
    login(resp);
  };

  return (
    <>
      <Box sx={{ m: 2 }} textAlign="center">
        {renderUnityComponent()}
        <Box textAlign="center">
          <Grid container flexDirection="column" spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                onClick={startUnity}
                disabled={!isUnityStopped}
              >
                Start
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={injectCredentials}
                disabled={isUnityStopped || !canInjectCredentials}
              >
                Inject credentials
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={quitUnity}
                disabled={isUnityStopped}
              >
                Quit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
