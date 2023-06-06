import { RefreshOutlined } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import AppEnv from "../../common/env.ts";
import { useLogin } from "../../hooks";
import { GetChats } from "../../services/chat/api.ts";
import { useAppSelector } from "../../store/hooks.ts";
import { selectChatInfo } from "../../store/slice/Chat.Slice.tsx";
import ChatItem from "./ChatItem.tsx";
import MenuItem from "./MenuItem.tsx";

const ChatList = () => {
  const { isSetToken } = useLogin();
  
  const { data: chats, isLoading, isError, refetch } = useQuery([ "chats", "getList" ], GetChats, {
    select: (resp) => resp.data,
    enabled: isSetToken,
  });
  
  const activeChatId = useAppSelector(selectChatInfo).activeChatId;
  const title = chats?.find((chat) => chat.id === activeChatId)?.name ?? AppEnv.App.Title;
  useEffect(() => {
    document.title = title;
  }, [ title ]);
  
  if (isLoading || isError) {
    return (
      <MenuItem icon={ <RefreshOutlined /> }
        loading={ isLoading }
        onClick={ () => { refetch().then(); } }>
        { isLoading ? "加载中" :
          isError ? "获取失败，请重试" : "重新加载" }
      </MenuItem>
    );
  }
  
  return (
    <div className={ "w-full h-full flex flex-col gap-1" }>
      { chats.map((chat) => (
        <ChatItem key={ chat.id } chatInfo={ chat } />
      )) }
    </div>
  );
};

export default ChatList;
