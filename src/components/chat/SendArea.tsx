import { TextField } from "@mui/material";
import React, { useState } from "react";

export interface SendAreaProps {
  onSend?: (text: string) => void;
}

const SendArea = ({ onSend }: SendAreaProps) => {
  const [ text, setText ] = useState("");
  
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (onSend) {
        onSend(text);
      }
      setText("");
    }
  };
  
  return (<>
    <div className={ "absolute bottom-0 left-0 w-full pt-2 bg-gradient-to-b to-50% to-white" } >
      <div className={ "max-w-3xl p-2 mx-auto mb-0 flex flex-col gap-2 relative" } >
        <div className="my-message-send-area" >
          <TextField
            className=""
            label={ "请输入消息，Shift + Enter 键换行，Enter 键发送" }
            multiline
            fullWidth
            autoFocus
            maxRows={ 8 }
            value={ text }
            onChange={ (e) => { setText(e.target.value); } }
            onKeyDown={ onKeyDown }
          />
        </div >
      </div >
    </div >
  </>);
};

export default SendArea;
