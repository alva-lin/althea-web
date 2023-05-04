import axios from "axios";
import { ChatId, ChatInfo, MessageInfo } from "./models";
import { RenameChatReqDto } from "./requestModels.ts";

export async function GetChats() {
  return axios.request<ChatInfo[]>({
    method: "GET",
    url: `/Chat`,
  });
}

// 新建聊天 POST /Chat/create
export async function CreateChat() {
  return axios.request<ChatInfo>({
    method: "POST",
    url: `/Chat/create`,
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
