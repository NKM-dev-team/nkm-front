import * as GameRequest from "../types/requests/GameRequest";
import { enqueueNotificationError } from "../features/notificationSlice";
import { WebsocketGameRequest } from "../types/game/ws/WebsocketGameRequest";
import { GameRoute } from "../types/game/ws/GameRoute";
import { GameResponseType } from "../types/game/ws/GameResponseType";
import { WebsocketGameResponse } from "../types/game/ws/WebsocketGameResponse";
import { WsHandler } from "./WsHandler";

export class GameWsHandler extends WsHandler<
  WebsocketGameRequest,
  WebsocketGameResponse
> {
  override sendOrEnqueueRequest(wsRequest: WebsocketGameRequest) {
    this.logBlue(`${wsRequest.requestPath} ${wsRequest.requestJson}`);
    super.sendOrEnqueueRequest(wsRequest);
  }

  private send(requestPath: GameRoute, request: any) {
    const wsRequest: WebsocketGameRequest = {
      requestPath: requestPath,
      requestJson: JSON.stringify(request),
    };
    this.sendOrEnqueueRequest(wsRequest);
  }

  override receiveJson(json: any) {
    super.receiveJson(json);

    const m = json as WebsocketGameResponse;

    this.logPurple(
      `${m.gameResponseType}(${m.statusCode}) ${m.body.substring(0, 250)}`
    );

    if (m.gameResponseType === GameResponseType.Error) {
      this.dispatch(enqueueNotificationError(m.body));
    } else if (m.statusCode !== 200) {
      if (m.body) {
        this.dispatch(enqueueNotificationError(m.body));
      } else {
        this.dispatch(
          enqueueNotificationError(
            `Request failed with status code ${m.statusCode}`
          )
        );
      }
    } else {
      this.onReceiveSuccess(m);
    }
  }

  auth(request: GameRequest.Auth) {
    this.send(GameRoute.Auth, request);
  }

  observe(request: GameRequest.Observe) {
    this.send(GameRoute.Observe, request);
  }

  getState(request: GameRequest.GetState) {
    this.send(GameRoute.GetState, request);
  }

  getCurrentClock(request: GameRequest.GetCurrentClock) {
    this.send(GameRoute.GetCurrentClock, request);
  }

  pause(request: GameRequest.Pause) {
    this.send(GameRoute.Pause, request);
  }

  surrender(request: GameRequest.Surrender) {
    this.send(GameRoute.Surrender, request);
  }

  banCharacters(request: GameRequest.BanCharacters) {
    this.send(GameRoute.BanCharacters, request);
  }

  pickCharacter(request: GameRequest.PickCharacter) {
    this.send(GameRoute.PickCharacter, request);
  }

  blindPickCharacters(request: GameRequest.BlindPickCharacters) {
    this.send(GameRoute.BlindPickCharacters, request);
  }

  placeCharacters(request: GameRequest.PlaceCharacters) {
    this.send(GameRoute.PlaceCharacters, request);
  }

  endTurn(request: GameRequest.EndTurn) {
    this.send(GameRoute.EndTurn, request);
  }

  passTurn(request: GameRequest.PassTurn) {
    this.send(GameRoute.PassTurn, request);
  }

  move(request: GameRequest.Move) {
    this.send(GameRoute.Move, request);
  }

  basicAttack(request: GameRequest.BasicAttack) {
    this.send(GameRoute.BasicAttack, request);
  }

  useAbilityWithoutTarget(request: GameRequest.UseAbilityWithoutTarget) {
    this.send(GameRoute.UseAbilityWithoutTarget, request);
  }

  useAbilityOnCoordinates(request: GameRequest.UseAbilityOnCoordinates) {
    this.send(GameRoute.UseAbilityOnCoordinates, request);
  }

  useAbilityOnCharacter(request: GameRequest.UseAbilityOnCharacter) {
    this.send(GameRoute.UseAbilityOnCharacter, request);
  }

  sendChatMessage(request: GameRequest.SendChatMessage) {
    this.send(GameRoute.SendChatMessage, request);
  }

  executeCommand(request: GameRequest.ExecuteCommand) {
    this.send(GameRoute.ExecuteCommand, request);
  }
}
