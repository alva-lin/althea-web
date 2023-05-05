import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { GetChat } from "../services/chat/api.ts";
import { ChatId } from "../services/chat/models.ts";

const Chat = () => {
  const params = useParams();
  const chatId = Number(params["id"]) as ChatId;
  const { data: chat, isLoading, isError } = useQuery([ "chats", "getOne", chatId ], async () => {
    return await GetChat({ id: chatId });
  }, {
    select: (resp) => resp.data,
  });
  
  return (<>
    <div className={ "w-full h-full" } >
      chatId: { chatId }
      chat: { JSON.stringify(chat) }
      isLoading: { isLoading }
      isError: { isError }
    </div >
  </>);
};

export default Chat;
