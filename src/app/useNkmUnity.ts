import { useUnityContext } from "react-unity-webgl";
import { useState } from "react";
import { AuthResponse } from "../types/AuthResponse";
import { GameId } from "../types/typeAliases";
import { random } from "lodash";

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

  return {
    unityContextHook,
    unityKey,
    isUnityStopped,
    startUnity,
    quitUnity,
    login,
    loadGame,
  };
}
