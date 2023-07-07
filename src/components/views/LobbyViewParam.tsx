import React from "react";
import { useParams } from "react-router-dom";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import LobbyView from "./LobbyView";

interface LobbyViewParamProps {
  lobbyWsHook: WebSocketHook;
}

export default function LobbyViewParam({ lobbyWsHook }: LobbyViewParamProps) {
  const { id } = useParams<{ id: string }>();
  return <LobbyView lobbyWsHook={lobbyWsHook} id={id}></LobbyView>;
}
