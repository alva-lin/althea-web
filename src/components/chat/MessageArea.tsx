import { useCallback, useEffect, useRef, useState } from "react";
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

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(true);

  useEffect(() => {
    if (chatId) {
        refetch(chatId);
    } else {
        restore();
    }
  }, [chatId, dispatch, refetch, restore]);

  useEffect(() => {
    if (scrollAnchorRef.current && shouldScroll) {
        scrollAnchorRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [shouldScroll, messages])

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const isScrolledToBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 100;
      setShouldScroll(isScrolledToBottom);
    }
  };

  const myOnSend = useCallback((text: string) => {
    setShouldScroll(true);
    onSend(text);
  }, [onSend]);

  return (
    <>
      <div className="h-full w-full flex flex-col relative overflow-y-scroll"
       ref={scrollContainerRef} onScroll={handleScroll}>
        <div className={"w-full flex-1 flex flex-col justify-start"}>
          {messages.map((message, index) => (
            <MessageItem key={message.id} message={message} index={index} />
          ))}
          <div className={"flex-none h-32"} ref={scrollAnchorRef}></div>
        </div>
      </div>
      <SendArea onSend={myOnSend} disabled={isLoading} />
    </>
  );
};

export default MessageArea;
