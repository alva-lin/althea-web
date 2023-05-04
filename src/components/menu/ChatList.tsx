import { RefreshOutlined } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { GetChats } from "../../services/chat/api.ts";
import ChatItem from "./ChatItem.tsx";
import MenuItem from "./MenuItem.tsx";

const ChatList = () => {
  const { data: chats, isLoading, isError, refetch } = useQuery([ "chats" ], GetChats, {
    select: (resp) => resp.data,
  });
  
  if (isLoading || isError) {
    return (
      <MenuItem icon={ <RefreshOutlined /> }
                loading={ isLoading }
                onClick={ () => { refetch().then(); } } >
        { isError ? "获取失败，请重试" : "加载中" }
      </MenuItem >
    );
  }
  
  return (
    <div className={ "w-full h-full flex flex-col gap-1" } >
      { chats.map((chat) => (
        <ChatItem key={ chat.id } chatInfo={ chat } />
      )) }
    </div >
  );
};

export default ChatList;
