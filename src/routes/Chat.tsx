import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import SendArea from "../components/chat/SendArea.tsx";
import useChatHub from "../hooks/useChatHub.tsx";
import { GetChat } from "../services/chat/api.ts";
import { ChatId } from "../services/chat/models.ts";

const Chat = () => {
  const params = useParams();
  const navigate = useNavigate();
  const chatId = Number(params["id"]) as ChatId;
  
  useQuery([ "chats", "getOne", chatId ], async () => {
    return await GetChat({ id: chatId! });
  }, {
    select: (resp) => resp.data,
    enabled: !!chatId,
    onError: () => {
      navigate("/");
    }
  });
  
  const { onSend, messages, isLoading } = useChatHub({ chatId });
  
  return (
    <>
      <div className={ "w-full h-full flex flex-col justify-start overflow-y-auto" }>
        { messages.map((message) => (
          <div key={ message?.id } className={ "flex flex-row" }>
            <div className={ "flex-none w-1/12" }></div>
            <div className={ "flex-none w-11/12" }>{
              message.content
            }</div>
          </div>
        )) }
        <div className={ "flex-none h-48" }></div>
      </div>
      <SendArea onSend={ onSend } disabled={ isLoading } />
    </>
  );
};

export default Chat;
