import SendArea from "../components/chat/SendArea.tsx";
import useChatHub from "../hooks/useChatHub.tsx";

const Welcome = () => {
  
  const { onSend, messages, isLoading } = useChatHub();
  
  return (<>
    <div className={ "w-full h-full flex flex-col justify-start overflow-y-auto" }>
      { messages.map((message) => (
        <div key={ message?.id } className={ "flex flex-row" }>
          <div className={ "flex-none w-1/12" }></div>
          <div className={ "flex-none w-11/12" }>{
            message.content
          }</div>
        </div>
      )) }
      <div className={ "flex-none h-48" }></div>
    </div>
    <SendArea onSend={ onSend } disabled={ isLoading } />
  </>);
};

export default Welcome;
