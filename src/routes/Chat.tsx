import { useParams } from "react-router-dom";
import { ChatId } from "../services/chat/models.ts";
import { useAppDispatch } from "../store/hooks.ts";
import { useEffect } from "react";
import { setActiveChat } from "../store/slice/Chat.Slice.tsx";
import MessageArea from "../components/chat/MessageArea.tsx";

const Chat = () => {
  const params = useParams();
  const chatId = Number(params["id"]) as ChatId;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveChat({ id: chatId }));
  }, [chatId, dispatch]);

  return (
    <>
      <MessageArea chatId={chatId} />
    </>
  );
};

export default Chat;
