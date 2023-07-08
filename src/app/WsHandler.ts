export abstract class WsHandler<WsRequest, WsResponse> {
  protected readonly dispatch: any;
  protected readonly sendJson: (jsonMessage: any, keep?: boolean) => void;
  protected readonly onReceiveSuccess: (response: WsResponse) => void;
  protected readonly synchronizedMode: boolean;

  private requestQueue: WsRequest[] = [];
  private locked: boolean = false;

  constructor(
    dispatch: any,
    sendJsonMessage: (jsonMessage: any, keep?: boolean) => void,
    onReceiveSuccess: (response: WsResponse) => void,
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

  protected logBlue(message: String) {
    console.log(`%c ${message}`, "background: #006f91");
  }

  protected logPurple(message: String) {
    console.log(`%c ${message}`, "background: #850aa3");
  }

  protected handleQueue() {
    if (this.requestQueue.length > 0 && !this.locked) {
      const request = this.requestQueue.shift();
      if (request) {
        this.locked = true;
        this.sendJson(request);
      }
    }
  }

  protected sendOrEnqueueRequest(wsRequest: WsRequest) {
    if (this.synchronizedMode) {
      this.requestQueue.push(wsRequest);
      return;
    }
    this.sendJson(wsRequest);
  }

  protected receiveJson(json: any) {
    this.locked = false;
  }
}
