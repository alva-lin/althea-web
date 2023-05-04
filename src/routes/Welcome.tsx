import { useCallback } from "react";
import SendArea from "../components/chat/SendArea.tsx";

const Welcome = () => {
  
  const onSend = useCallback((text: string) => {
    console.log(text);
  }, []);
  
  return (<>
    <div className={ "w-full h-full" } ></div >
    <SendArea onSend={ onSend } />
  </>);
};

export default Welcome;
