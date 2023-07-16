import React from "react";
import { useParams } from "react-router-dom";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import GameView from "./GameView";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface GameViewParamProps {
  gameWsHook: WebSocketHook;
}

export default function GameViewParam({ gameWsHook }: GameViewParamProps) {
  const { id } = useParams<{ id: string }>();

  const authData = useSelector((state: RootState) => state.authData);

  return (
    <GameView gameWsHook={gameWsHook} id={id} authState={authData}></GameView>
  );
}
