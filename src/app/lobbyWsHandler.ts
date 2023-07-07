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
  private readonly synchronizedMode: boolean;

  private requestQueue: WebsocketLobbyRequest[] = [];
  private locked: boolean = false;

  constructor(
    dispatch: any,
    sendJsonMessage: (jsonMessage: any, keep?: boolean) => void,
    onReceiveSuccess: (response: WebsocketLobbyResponse) => void,
    synchronizedMode: boolean = false
  ) {
    this.sendJson = sendJsonMessage;
    this.dispatch = dispatch;
    this.onReceiveSuccess = onReceiveSuccess;
    this.synchronizedMode = synchronizedMode;

    if (this.synchronizedMode) {
      setInterval(() => this.handleQueue(), 500);
    }
  }

  private handleQueue() {
    if (this.requestQueue.length > 0 && !this.locked) {
      const request = this.requestQueue.shift();
      if (request) {
        this.locked = true;
        this.sendRequest(request);
      }
    }
  }

  private sendRequest(wsRequest: WebsocketLobbyRequest) {
    console.log(
      `%c ${wsRequest.requestPath} ${wsRequest.requestJson}`,
      "background: #006f91"
    );
    this.sendJson(wsRequest);
  }

  private send(requestPath: LobbyRoute, request: any) {
    const wsRequest: WebsocketLobbyRequest = {
      requestPath: requestPath,
      requestJson: JSON.stringify(request),
    };
    if (this.synchronizedMode) {
      this.requestQueue.push(wsRequest);
      return;
    }
    this.sendRequest(wsRequest);
  }

  receiveJson(json: any) {
    this.locked = false;
    const m = json as WebsocketLobbyResponse;
    console.log(
      `%c ${m.lobbyResponseType}(${m.statusCode}) ${m.body.substring(0, 250)}`,
      "background: #850aa3"
    );
    if (m.lobbyResponseType === LobbyResponseType.Error) {
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

  auth(request: LobbyRequest.Auth) {
    this.send(LobbyRoute.Auth, request);
  }

  observe(request: LobbyRequest.Observe) {
    if (this.synchronizedMode) {
      console.warn("observe may break synchronized mode");
    }

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
