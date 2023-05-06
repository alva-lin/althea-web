import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import { useCallback, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatId, ChatInfo } from "../../services/chat/models.ts";

export interface ChatItemProps {
  chatInfo: ChatInfo;
}

const ChatItem = ({ chatInfo }: ChatItemProps) => {
  const params = useParams();
  const chatId = Number(params["id"]) as ChatId;
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(chatId === chatInfo.id);
  }, [chatId, chatInfo.id])
  
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/chat/${ chatInfo.id }`);
  }, [ chatInfo, navigate ]);
  
  return (<div className={ "my-menu-item my-no-select gap-2" + (isActive ? ' active' : '') } onClick={ onClick } >
    <div className={ "flex-none flex flex-col justify-center" } >
      <ChatBubbleOutlineOutlined sx={ { "fontSize": 20 } } />
    </div >
    <div className="chat-name" >
      { chatInfo.name }
      <div ></div >
    </div >
  </div >);
};

export default ChatItem;
