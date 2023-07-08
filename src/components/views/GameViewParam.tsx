import React from "react";
import { useParams } from "react-router-dom";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import GameView from "./GameView";

interface GameViewParamProps {
  gameWsHook: WebSocketHook;
}

export default function GameViewParam({ gameWsHook }: GameViewParamProps) {
  const { id } = useParams<{ id: string }>();

  return <GameView gameWsHook={gameWsHook} id={id}></GameView>;
}
