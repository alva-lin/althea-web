import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import { ChatInfo } from "../../services/chat/models.ts";

export interface ChatItemProps {
  chatInfo: ChatInfo;
}

const ChatItem = ({ chatInfo }: ChatItemProps) => {
  return (<div className={ "my-menu-item my-no-select gap-2" } >
    <div className={ "flex-none flex flex-col justify-center" } >
      <ChatBubbleOutlineOutlined sx={ { "fontSize": 20 } } />
    </div >
    <div className="chat-name">
      { chatInfo.name }
      <div></div>
    </div >
  </div >);
};

export default ChatItem;
