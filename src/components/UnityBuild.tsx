import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityBuild() {
  const buildFolder = "unity_build";
  const buildName = "nkm-webgl-build";

  const { unityProvider, requestFullscreen, unload } = useUnityContext({
    loaderUrl: `${buildFolder}/${buildName}.loader.js`,
    dataUrl: `${buildFolder}/${buildName}.data`,
    frameworkUrl: `${buildFolder}/${buildName}.framework.js`,
    codeUrl: `${buildFolder}/${buildName}.wasm`,
  });

  useEffect(() => {
    return () => {
      unload();
    };
  }, []);

  return (
    <>
      <Box sx={{ m: 2 }} textAlign="center">
        <Unity
          unityProvider={unityProvider}
          style={{ width: 1024, height: 576 }}
        />
        <Box textAlign="center">
          <Button variant="contained" onClick={() => requestFullscreen(true)}>
            Fullscreen
          </Button>
        </Box>
      </Box>
    </>
  );
}
