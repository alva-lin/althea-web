import MessageItem from "../components/chat/MessageItem.tsx";
import SendArea from "../components/chat/SendArea.tsx";
import useChatHub from "../hooks/useChatHub.tsx";

const Welcome = () => {
  const { onSend, messages, isLoading } = useChatHub();

  return (<>
    <div className={ "w-full h-full flex flex-col justify-start overflow-y-auto" }>
        {messages.map((message, index) => (
          <MessageItem key={message.id} message={message} index={index} />
        ))}
      <div className={ "flex-none h-48" }></div>
    </div>
    <SendArea onSend={ onSend } disabled={ isLoading } />
  </>);
};

export default Welcome;
