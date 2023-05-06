import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { GetChat } from "../services/chat/api.ts";
import { ChatId } from "../services/chat/models.ts";
import { useCallback } from "react";
import SendArea from "../components/chat/SendArea.tsx";
import { useLogin } from "../hooks/index.ts";

const Chat = () => {
  const { isSetToken } = useLogin();

  const params = useParams();
  const chatId = Number(params["id"]) as ChatId;
  const {
    data: chat,
    isLoading,
    isError,
  } = useQuery(
    ["chats", "getOne", chatId],
    async () => {
      return await GetChat({ id: chatId });
    },
    {
      select: (resp) => resp.data,
      enabled: isSetToken && !!chatId,
    }
  );

  const onSend = useCallback((text: string) => {
    console.log(text);
  }, []);

  return (
    <>
      <div className={"w-full h-full"}>
        chatId: {chatId}
        chat: {JSON.stringify(chat)}
        isLoading: {isLoading}
        isError: {isError}
      </div>
      <SendArea onSend={onSend} />
    </>
  );
};

export default Chat;
