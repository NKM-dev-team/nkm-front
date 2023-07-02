import * as LobbyRequest from "../types/requests/LobbyRequest";
import { WebsocketLobbyRequest } from "../types/lobby/ws/WebsocketLobbyRequest";
import { LobbyRoute } from "../types/lobby/ws/LobbyRoute";
import { WebsocketLobbyResponse } from "../types/lobby/ws/WebsocketLobbyResponse";
import { LobbyResponseType } from "../types/lobby/ws/LobbyResponseType";
import { enqueueNotificationError } from "../features/notificationSlice";

export class LobbyWsHandler {
  private readonly sendJson: (jsonMessage: any, keep?: boolean) => void;
  private readonly dispatch: any;
  private readonly onReceiveSuccess: (response: WebsocketLobbyResponse) => void;

  private lastPing: any = Date.now();

  constructor(
    dispatch: any,
    sendJsonMessage: (jsonMessage: any, keep?: boolean) => void,
    onReceiveSuccess: (response: WebsocketLobbyResponse) => void
  ) {
    this.sendJson = sendJsonMessage;
    this.dispatch = dispatch;
    this.onReceiveSuccess = onReceiveSuccess;
    setInterval(() => {
      this.ping();
    }, 1000);
  }

  private send(requestPath: LobbyRoute, request: any) {
    const wsRequest: WebsocketLobbyRequest = {
      requestPath: requestPath,
      requestJson: JSON.stringify(request),
    };
    console.log(wsRequest);
    this.sendJson(wsRequest);
  }

  receiveJson(json: any) {
    const m = json as WebsocketLobbyResponse;
    console.log(m);
    if (m.lobbyResponseType === LobbyResponseType.Error) {
      this.dispatch(enqueueNotificationError(m.body));
    } else if (m.lobbyResponseType === LobbyResponseType.Ping) {
      const rtt = Date.now() - this.lastPing;
      const owt = rtt / 2;
      console.log("PING: " + owt);
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

  ping() {
    this.lastPing = Date.now();
    this.send(LobbyRoute.Ping, "");
  }

  auth(request: LobbyRequest.Auth) {
    this.send(LobbyRoute.Auth, request);
  }

  observe(request: LobbyRequest.Observe) {
    this.send(LobbyRoute.Observe, request);
  }

  getLobbies() {
    this.send(LobbyRoute.Lobbies, "");
  }

  getLobby(request: LobbyRequest.GetLobby) {
    this.send(LobbyRoute.Lobby, request);
  }

  create(request: LobbyRequest.LobbyCreation) {
    this.send(LobbyRoute.CreateLobby, request);
  }

  join(request: LobbyRequest.LobbyJoin) {
    this.send(LobbyRoute.JoinLobby, request);
  }

  leave(request: LobbyRequest.LobbyLeave) {
    this.send(LobbyRoute.LeaveLobby, request);
  }

  setHexMap(request: LobbyRequest.SetHexMapName) {
    this.send(LobbyRoute.SetHexMap, request);
  }

  setNumberOfBans(request: LobbyRequest.SetNumberOfBans) {
    this.send(LobbyRoute.SetNumberOfBans, request);
  }

  setNumberOfCharactersPerPlayer(
    request: LobbyRequest.SetNumberOfCharactersPerPlayer
  ) {
    this.send(LobbyRoute.SetNumberOfCharacters, request);
  }

  setPickType(request: LobbyRequest.SetPickType) {
    this.send(LobbyRoute.SetPickType, request);
  }

  setLobbyName(request: LobbyRequest.SetLobbyName) {
    this.send(LobbyRoute.SetLobbyName, request);
  }

  setClockConfig(request: LobbyRequest.SetClockConfig) {
    this.send(LobbyRoute.SetClockConfig, request);
  }

  startGame(request: LobbyRequest.StartGame) {
    this.send(LobbyRoute.StartGame, request);
  }
}
