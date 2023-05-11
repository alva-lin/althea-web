import { useQuery, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { useCallback, useEffect, useState } from "react";
import { GenerateTitle, GetChatMessages } from "../services/chat/api.ts";
import { ChatHub } from "../services/chat/chatHub.ts";
import { ChatId, MessageInfo, MessageType } from "../services/chat/models.ts";
import { useLogin } from "./index.ts";
import { setActiveChat } from "../store/slice/Chat.Slice.tsx";
import { useAppDispatch } from "../store/hooks.ts";

export interface useChatHubProps {
  chatId?: ChatId;
}

const useChatHub = (props?: useChatHubProps) => {
  const { isSetToken, getAccessToken } = useLogin();
  const dispatch = useAppDispatch();

  const [ chatHub ] = useState<ChatHub>(() => {
    return new ChatHub(getAccessToken);
  });
  const [ chatId, setChatId ] = useState(props?.chatId);
  const [ messages, setMessages ] = useState<MessageInfo[]>([]);

  const [ isLoading, setIsLoading ] = useState(false);
  const [ isError, setIsError ] = useState(false);
  const [ error, setError ] = useState<Error>();

  const queryClient = useQueryClient();
  const { refetch } = useQuery(
    [ "chats", "getMessages", chatId ],
    async () => {
      if (chatId === undefined || !isSetToken) {
        return {data: []};
      }
      setIsLoading(true);
      setIsError(false);
      return await GetChatMessages({ id: chatId! });
    },
    {
      select: (resp) => resp.data,
      enabled: isSetToken && !!chatId,
      retry: false,
      onSuccess: (messages: MessageInfo[]) => {
        setMessages(messages);
      },
      onError: (error: Error) => {
        setError(error);
        setIsError(true);
      },
      onSettled: () => {
        setIsLoading(false);
      }
    }
  );

  const onSend = useCallback((text: string) => {
    if (text === "") {
      return;
    }
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setIsError(false);

    const prevMessage = messages[messages.length - 1];
    const sent: MessageInfo = {
      id: -1,
      chatId: chatId,
      prevMessageId: prevMessage?.id,
      nextMessageIds: [ -2 ],
      isRoot: false,
      order: prevMessage?.order + 1 ?? 0,
      content: text,
      type: MessageType.User,
      usage: 0,
      sendTime: new Date(),
    };
    const received: MessageInfo = {
      id: -2,
      chatId: chatId,
      prevMessageId: sent.id,
      nextMessageIds: [],
      isRoot: false,
      order: sent.order + 1 ?? 0,
      content: "",
      type: MessageType.Assistant,
      usage: 0,
      sendTime: new Date(),
    };
    const newMessages = produce(messages, (draft) => {
      draft[draft.length - 1]?.nextMessageIds.push(sent.id);
      draft.push(sent);
      draft.push(received);
    });
    setMessages(newMessages);
    let receiveContent = "";

    chatHub.sendMessage({
      chatId: chatId,
      prevMessageId: prevMessage?.id,
      message: text,
      model: undefined,
    }, {
      next: (resp) => {
        const [ sent, received ] = [ resp.sent, resp.received ];
        if (!resp.isEnd) {
          sent.id = -1;
          received.id = -2;
          sent.nextMessageIds = [ received.id ];
          received.prevMessageId = sent.id;

          receiveContent += received.content;
          received.content = receiveContent;
        }
        setMessages(produce(newMessages, (draft) => {
          const index = draft.length - 3;

          draft[index]?.nextMessageIds.pop();
          draft[index]?.nextMessageIds.push(sent.id);

          draft[index + 1] = sent;
          draft[index + 2] = received;
        }));

        if (resp.isEnd) {
          // setChatId(sent.chatId);
          dispatch(setActiveChat({ id: sent.chatId }));
        }
        if (resp.isEnd && newMessages.length == 2) {
          GenerateTitle({ id: sent.chatId! }).then(() => {
            // queryClient.invalidateQueries([ "chats", "getOne", sent.chatId! ]).then();
            queryClient.invalidateQueries([ "chats", "getList" ]).then();
          });
        }
      },
      error: (error) => {
        setError(error as Error);
        setIsError(true);

        console.error(error);
      },
      complete: () => {
        setIsLoading(false);
      }
    }).then();
  }, [chatHub, chatId, dispatch, isLoading, messages, queryClient]);

  const refetchMessages = useCallback((chatId?: ChatId) => {
    setChatId(chatId);
  }, [setChatId]);

  const restore = useCallback(()=> {
    setChatId(undefined);
    setMessages([]);
  }, []);

  useEffect(() => {
    refetch();
  }, [chatId, refetch]);

  return {
    chatHub,
    onSend,
    messages,

    isLoading,
    isError,
    error,

    refetch: refetchMessages,
    restore
  };
};

export default useChatHub;
