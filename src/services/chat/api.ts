import axios from "axios";
import { ChatId, ChatInfo, MessageInfo } from "./models";
import { RenameChatReqDto } from "./requestModels.ts";

export async function GetChats() {
  return axios.request<ChatInfo[]>({
    method: "GET",
    url: `/Chat`,
  });
}

export async function GetChat(data: { id: ChatId }) {
  return axios.request<ChatInfo>({
    method: "GET",
    url: `/Chat/${ data.id }`,
  });
}

// 生成聊天名称 POST /Chat/GenerateTitle
export async function GenerateTitle(data: { id: ChatId }) {
  return axios.request<string>({
    method: "POST",
    url: `/Chat/${ data.id }/gen-title`,
  });
}

// 重命名聊天 POST /Chat/{ChatId}/rename
export async function RenameChat(data: RenameChatReqDto) {
  return axios.request<never>({
    method: "POST",
    url: `/Chat/${ data.id }/rename`,
    data: data,
  });
}

// 删除聊天 POST /Chat/{ChatId}/delete
export async function DeleteChat(data: { id: ChatId }) {
  return axios.request<never>({
    method: "POST",
    url: `/Chat/${ data.id }/delete`,
  });
}

// 获取聊天记录 GET /Chat/{ChatId}/messages
export async function GetChatMessages(data: { id: ChatId }) {
  return axios.request<MessageInfo[]>({
    method: "GET",
    url: `/Chat/${ data.id }/messages`,
  });
}
