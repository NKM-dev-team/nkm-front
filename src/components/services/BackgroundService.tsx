import { useDispatch, useSelector } from "react-redux";
import { updateVersionIfNewer } from "../../features/versionSlice";
import { VERSION_CHECK_INTERVAL } from "../../app/consts";
import { useMountEffect } from "../../app/utils";
import { ReadyState } from "react-use-websocket";
import { RootState } from "../../app/store";
import { Auth } from "../../types/requests/LobbyRequest";
import { useEffect, useMemo } from "react";
import { LobbyWsHandler } from "../../app/lobbyWsHandler";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";

export default function BackgroundService({
  lobbyWsHook,
}: {
  lobbyWsHook: WebSocketHook;
}) {
  const dispatch = useDispatch();

  const checkForNewVersionRepeatedly = () => {
    dispatch(updateVersionIfNewer());
    setTimeout(checkForNewVersionRepeatedly, VERSION_CHECK_INTERVAL);
  };

  useMountEffect(checkForNewVersionRepeatedly);

  const { sendJsonMessage, lastJsonMessage, readyState } = lobbyWsHook;

  const authData = useSelector((state: RootState) => state.authData);

  const lobbyWsHandler = useMemo(
    () => new LobbyWsHandler(dispatch, sendJsonMessage),
    [dispatch, sendJsonMessage]
  );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      lobbyWsHandler.receiveJson(lastJsonMessage);
    }
  }, [lastJsonMessage, lobbyWsHandler]);

  useEffect(() => {
    if (!authData.token) {
      // TODO: remove auth on the WS
    }
  }, [authData.token]);

  useEffect(() => {
    if (readyState !== ReadyState.OPEN) return;
    if (!authData.token) return;
    const authRequest: Auth = { token: authData.token };
    lobbyWsHandler.sendAuth(authRequest);
  }, [authData.token, lobbyWsHandler, readyState]);

  return null;
}
