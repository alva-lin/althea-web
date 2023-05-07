// 重命名聊天请求体
import { ChatId, MessageId, MessageInfo } from "./models.ts";

export type RenameChatReqDto = {
  id: ChatId;
  title: string;
};

export type SendMessageReqDto = {
  chatId?: ChatId;
  prevMessageId?: MessageId;
  message: string;
  model?: string;
};

export type SendMessageRespDto = {
  sent: MessageInfo;
  received: MessageInfo;
  isEnd: boolean;
};
