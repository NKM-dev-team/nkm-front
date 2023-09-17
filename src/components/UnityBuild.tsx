import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { AuthResponse } from "../types/AuthResponse";

export default function UnityBuild() {
  const buildFolder = "unity_build";
  const buildName = "nkm-webgl-build";

  const { unityProvider, requestFullscreen, unload, sendMessage, isLoaded } =
    useUnityContext({
      loaderUrl: `${buildFolder}/${buildName}.loader.js`,
      dataUrl: `${buildFolder}/${buildName}.data`,
      frameworkUrl: `${buildFolder}/${buildName}.framework.js`,
      codeUrl: `${buildFolder}/${buildName}.wasm`,
    });

  const authData = useSelector((state: RootState) => state.authData);
  const [isUnityStopped, setIsUnityStopped] = useState<boolean>(false);

  const generateKey = (): string => new Date().getTime().toString();
  const [unityKey, setUnityKey] = useState<string>(generateKey());

  const canInjectCredentials = !!authData.token && !!authData.userState;

  const injectCredentials = () => {
    if (!authData.token || !authData.userState) return;

    let resp: AuthResponse = {
      token: authData.token,
      userState: authData.userState,
    };
    sendMessage("MenuManager", "WebglLogin", JSON.stringify(resp));
  };

  const quitUnity = async () => {
    unload().then(() => setIsUnityStopped(true));
  };

  const startUnity = async () => {
    setUnityKey(generateKey());
    setIsUnityStopped(false);
  };

  return (
    <>
      <Box sx={{ m: 2 }} textAlign="center">
        <Unity
          unityProvider={unityProvider}
          style={{ width: 1024, height: 576 }}
          key={unityKey}
        />
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
                onClick={() => requestFullscreen(true)}
                disabled={isUnityStopped}
              >
                Fullscreen
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
