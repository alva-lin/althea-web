import { useEffect } from "react";
import useChatHub from "../../hooks/useChatHub";
import { ChatId } from "../../services/chat/models";
import MessageItem from "./MessageItem";
import SendArea from "./SendArea";
import { useAppDispatch } from "../../store/hooks";

export interface MessageAreaProps {
  chatId?: ChatId;
}

const MessageArea = ({ chatId }: MessageAreaProps) => {
  const dispatch = useAppDispatch();

  const { onSend, messages, isLoading, refetch, restore } = useChatHub({ chatId });

  useEffect(() => {
    if (chatId) {
        refetch(chatId);
    } else {
        restore();
    }
  }, [chatId, dispatch, refetch, restore]);

  return (
    <>
      <div
        className={"w-full h-full flex flex-col justify-start overflow-y-auto"}
      >
        {messages.map((message, index) => (
          <MessageItem key={message.id} message={message} index={index} />
        ))}
        <div className={"flex-none h-48"}></div>
      </div>
      <SendArea onSend={onSend} disabled={isLoading} />
    </>
  );
};

export default MessageArea;
