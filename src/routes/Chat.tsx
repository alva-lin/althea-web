import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import SendArea from "../components/chat/SendArea.tsx";
import useChatHub from "../hooks/useChatHub.tsx";
import { GetChat } from "../services/chat/api.ts";
import { ChatId } from "../services/chat/models.ts";
import MessageItem from "../components/chat/MessageItem.tsx";
import { useAppDispatch } from "../store/hooks.ts";
import { useEffect } from "react";
import { setActiveChat } from "../store/slice/Chat.Slice.tsx";

const Chat = () => {
  const params = useParams();
  const navigate = useNavigate();
  const chatId = Number(params["id"]) as ChatId;

  const dispatch = useAppDispatch();

  // const queryClient = useQueryClient();
  useQuery(
    ["chats", "getOne", chatId],
    async () => {
      return await GetChat({ id: chatId! });
    },
    {
      select: (resp) => resp.data,
      enabled: !!chatId,
      onError: () => {
        navigate("/");
      },
      onSettled: () => {
        refetch(chatId);
      }
    }
  );

  useEffect(() => {
    if (chatId) {
      dispatch(setActiveChat({ id: chatId }));
    }
  }, [chatId, dispatch]);


  const { onSend, messages, isLoading, refetch } = useChatHub({ chatId });

  return (
    <>
      <div className={"w-full h-full flex flex-col items-center overflow-y-auto"}>
        {messages.map((message, index) => (
          <MessageItem key={message.id} message={message} index={index} />
        ))}
        <div className={"flex-none h-48 w-full"}></div>
      </div>
      <SendArea onSend={onSend} disabled={isLoading} />
    </>
  );
};

export default Chat;
