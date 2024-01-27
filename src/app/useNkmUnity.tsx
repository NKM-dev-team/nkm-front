import { Unity, useUnityContext } from "react-unity-webgl";
import React, { useState } from "react";
import { AuthResponse } from "../types/AuthResponse";
import { GameId } from "../types/typeAliases";
import { random } from "lodash";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

export default function useNkmUnity() {
  const buildFolder = "unity_build";
  const buildName = "nkm-webgl-build";
  const webglInteropGameObjectName = "Webgl.Interop";

  const unityContextHook = useUnityContext({
    loaderUrl: `${buildFolder}/${buildName}.loader.js`,
    dataUrl: `${buildFolder}/${buildName}.data`,
    frameworkUrl: `${buildFolder}/${buildName}.framework.js`,
    codeUrl: `${buildFolder}/${buildName}.wasm`,
  });

  const [isUnityStopped, setIsUnityStopped] = useState<boolean>(false);

  const generateKey = (): string =>
    new Date().getTime().toString() + random(0, 1, true).toString();
  const [unityKey, setUnityKey] = useState<string>(generateKey());

  const startUnity = async () => {
    setUnityKey(generateKey());
    setIsUnityStopped(false);
  };

  const quitUnity = async () => {
    unityContextHook.unload().then(() => setIsUnityStopped(true));
  };

  const login = (authResponse: AuthResponse) => {
    unityContextHook.sendMessage(
      webglInteropGameObjectName,
      "Login",
      JSON.stringify(authResponse)
    );
  };
  const loadGame = (gameId: GameId) => {
    unityContextHook.sendMessage(
      webglInteropGameObjectName,
      "LoadGame",
      gameId
    );
  };

  const renderUnityComponent = () => (
    <Box position="relative" display="inline-block">
      <Unity
        unityProvider={unityContextHook.unityProvider}
        style={{ width: 1024, height: 576 }}
        key={unityKey}
      />

      {/* Fullscreen IconButton */}
      <Box position="absolute" right={10} bottom={10}>
        <IconButton
          onClick={() => unityContextHook.requestFullscreen(true)}
          disabled={isUnityStopped}
          sx={{
            color: "white", // Icon color
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker on hover
            },
          }}
        >
          <FullscreenIcon />
        </IconButton>
      </Box>

      {/* Loading Progress */}
      {unityContextHook.loadingProgression < 1 && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <CircularProgress
            variant="determinate"
            value={unityContextHook.loadingProgression * 100}
            size={80}
          />
          <Typography
            variant="h6"
            component="p"
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(60px)",
              color: "white",
            }}
          >
            GAME LOADING
          </Typography>
        </Box>
      )}
    </Box>
  );

  return {
    unityContextHook,
    unityKey,
    isUnityStopped,
    startUnity,
    quitUnity,
    login,
    loadGame,
    renderUnityComponent,
  };
}
