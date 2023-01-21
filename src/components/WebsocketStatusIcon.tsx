import React from "react";
import { Tooltip } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WS_LOBBY_URL } from "../app/consts";

export default function WebsocketStatusIcon() {
  const { readyState } = useWebSocket(WS_LOBBY_URL, {
    share: true,
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const color = {
    [ReadyState.CONNECTING]: "yellow",
    [ReadyState.OPEN]: "green",
    [ReadyState.CLOSING]: "yellow",
    [ReadyState.CLOSED]: "red",
    [ReadyState.UNINSTANTIATED]: "red",
  }[readyState];

  return (
    <Tooltip title={`Connection status: ${connectionStatus}`}>
      <CircleIcon sx={{ color: color }} />
    </Tooltip>
  );
}
