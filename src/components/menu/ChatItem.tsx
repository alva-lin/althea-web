import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChatInfo } from "../../services/chat/models.ts";

export interface ChatItemProps {
  chatInfo: ChatInfo;
}

const ChatItem = ({ chatInfo }: ChatItemProps) => {
  
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/chat/${ chatInfo.id }`);
  }, [ chatInfo, navigate ]);
  
  return (<div className={ "my-menu-item my-no-select gap-2" } onClick={ onClick } >
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
