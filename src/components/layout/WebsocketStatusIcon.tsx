import React from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { ReadyState } from "react-use-websocket";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";

interface WebsocketStatusIconProps {
  wsName: string;
  wsHook: WebSocketHook;
  restartWs: () => void;
}

export default function WebsocketStatusIcon({
  wsName,
  wsHook,
  restartWs,
}: WebsocketStatusIconProps) {
  const { readyState } = wsHook;

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
    [ReadyState.UNINSTANTIATED]: "grey",
  }[readyState];

  return (
    <Tooltip
      title={
        <>
          <Typography>
            {wsName} connection status: {connectionStatus}
          </Typography>
          <Typography>To reconnect, click the circle.</Typography>
        </>
      }
    >
      <IconButton onClick={() => restartWs()}>
        <CircleIcon sx={{ color: color }} />
      </IconButton>
    </Tooltip>
  );
}
