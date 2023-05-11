import MessageArea from "../components/chat/MessageArea.tsx";
import { useAppSelector } from "../store/hooks.ts";
import { selectChatInfo } from "../store/slice/Chat.Slice.tsx";

const Welcome = () => {
  const chatId = useAppSelector(selectChatInfo).activeChatId;

  return (<>
    <MessageArea chatId={chatId} />
  </>);
};

export default Welcome;
