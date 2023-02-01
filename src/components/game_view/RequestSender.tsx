import React from "react";
import { Button } from "@mui/material";
import { TitledPaper } from "../TitledPaper";
import { GameRoute } from "../../types/game/ws/GameRoute";
import { WebsocketGameRequest } from "../../types/game/ws/WebsocketGameRequest";
import CustomSelect from "../CustomSelect";
import ReactJson from "react-json-view";
import { GameWsHandler } from "../../app/gameWsHandler";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { routeToWsGameRequest } from "../../app/utils";
import { GameStateView } from "../../types/game/GameStateView";

interface RequestSenderProps {
  gameWsHandler: GameWsHandler;
  gameState: GameStateView;
}

const defaultRoute = GameRoute.GetState;

export default function RequestSender({
  gameWsHandler,
  gameState,
}: RequestSenderProps) {
  const [request, setRequest] = React.useState<WebsocketGameRequest>(
    routeToWsGameRequest(gameState, defaultRoute)
  );

  const onRequestSenderSelectChange: OutlinedInputProps["onChange"] = (e) =>
    setRequest(routeToWsGameRequest(gameState, e.target.value as GameRoute));

  return (
    <TitledPaper title="Request sender" sx={{ m: 1, p: 1 }}>
      <CustomSelect
        options={Object.values(GameRoute)}
        defaultValue={defaultRoute}
        onChange={onRequestSenderSelectChange}
      ></CustomSelect>

      {request !== undefined ? (
        <ReactJson
          src={request}
          theme="monokai"
          onEdit={(o) => setRequest(o.updated_src as WebsocketGameRequest)}
        />
      ) : null}

      <Button onClick={() => gameWsHandler.sendRequest(request)}>
        Send request
      </Button>
    </TitledPaper>
  );
}
