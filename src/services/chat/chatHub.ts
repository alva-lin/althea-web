// src/services/SignalRService.js
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import AppEnv from "../../common/env.ts";
import { Response } from "../index.ts";
import { SendMessageReqDto, SendMessageRespDto } from "./requestModels.ts";

export class ChatHub {
  connection: HubConnection | null;
  
  connecting: boolean;
  
  disconnectTimeout: NodeJS.Timeout | null;
  
  disconnectTimeoutTime = 180;
  
  url: string;
  
  getAccessToken: () => Promise<string>;
  
  errorHandler?: (error: unknown) => void;
  
  constructor(getAccessToken: () => Promise<string>, errorHandler?: (error: unknown) => void) {
    this.connection = null;
    this.connecting = false;
    this.disconnectTimeout = null;
    this.url = AppEnv.Server.BaseUrl + AppEnv.Server.SignalRPath + "/chat";
    this.getAccessToken = getAccessToken;
    this.errorHandler = errorHandler;
  }
  
  // 初始化并连接到 SignalR
  initAndConnect = async () => {
    if (this.connection) {
      return;
    }
    this.connecting = true;
    this.connection = new HubConnectionBuilder()
      .withUrl(this.url, { accessTokenFactory: this.getAccessToken })
      .configureLogging(LogLevel.Error)
      .build();
    
    try {
      await this.connection.start();
      console.log("SignalR connected.");
    } catch (err) {
      console.error("Failed to connect to SignalR:", err);
      this.errorHandler && this.errorHandler(err);
      setTimeout(() => {
        this.initAndConnect();
      }, 5000);
    }
  };
  
  // 断开链接
  disconnect = async () => {
    if (!this.connection) {
      return;
    }
    
    try {
      await this.connection.stop();
      this.connection = null;
    } catch (err) {
      console.error("Failed to disconnect from SignalR:", err);
    }
  };
  
  // 发送消息
  sendMessage = async (
    params: SendMessageReqDto,
    subscribe: {
      next?: (value: SendMessageRespDto) => void;
      error?: (error: unknown) => void;
      complete?: () => void;
    },
  ) => {
    if (!this.connection) {
      await this.initAndConnect();
    }
    this.resetDisconnectTimeout();
    
    const stream = this.connection?.stream<Response<SendMessageRespDto>>("SendMessage", params);
    
    stream?.subscribe({
      next: (resp: Response<SendMessageRespDto>) => {
        if (resp.code !== 0 || resp.data === null) {
          console.error("Failed to send message:", resp);
          throw new Error(resp.errorMessage);
        }
        subscribe.next?.(resp.data);
      },
      error: (error: unknown) => {
        subscribe.error?.(error);
      },
      complete: () => {
        subscribe.complete?.();
      },
    });
  };
  
  private resetDisconnectTimeout = () => {
    if (this.disconnectTimeout) {
      clearTimeout(this.disconnectTimeout);
    }
    
    this.disconnectTimeout = setTimeout(() => {
      this.disconnect().then();
    }, this.disconnectTimeoutTime * 1000);
  };
}
