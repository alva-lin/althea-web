// 聊天 Id
export type ChatId = number;

// 聊天信息
export type ChatInfo = {
  id: ChatId;
  // 聊天名称
  name: string;
  // 模型
  model: string;
  // 最后一次发送消息的时间
  lastSendTime?: Date;
  // 聊天内容
  messages: MessageInfo[];
};

// 重命名聊天请求体
export type RenameChatRequest = {
  id: ChatId;
  // 聊天名称
  name: string;
};

// 消息 Id
export type MessageId = number;

// 消息类型
export enum MessageType {
  System = "System",
  User = "User",
  Assistant = "Assistant",
}

// 消息信息
export type MessageInfo = {
  id: MessageId;
  chatId: ChatId;
  // 序号
  order: number;
  // 消息内容
  content: string;
  // 消息类型
  type: MessageType;
  // Token 数
  usage: number;
  // 消息发送时间
  sendTime: Date;
};

// 添加聊天机器人设定请求体
export type RequestAddSystemMessage = {
  systemMessage: string;
};

export type RequestSendMessage = {
  id: ChatId;
  sent: string;
};

export type ResponseSendMessage = {
  sent: MessageInfo;
  received: MessageInfo;
  isEnd: boolean;
};
