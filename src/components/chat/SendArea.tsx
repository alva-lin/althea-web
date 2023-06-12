import { KeyboardVoiceOutlined } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";

export interface SendAreaProps {
  onSend?: (text: string) => void;
  disabled?: boolean;
}

const SendArea = ({ onSend, disabled }: SendAreaProps) => {
  const [ text, setText ] = useState("");
  
  const sendMessage = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (onSend) {
        onSend(text);
      }
      setText("");
    }
  }, [ onSend, text ]);
  
  const [ isPressed, setIsPressed ] = useState(false);
  const handlePress = useCallback(() => {
    setIsPressed(true);
  }, [ setIsPressed ]);
  const handleRelease = useCallback(() => {
    setIsPressed(false);
  }, [ setIsPressed ]);
  
  const textAreaDisabled = disabled || isPressed;
  const label = disabled ? "正在加载..." : "请输入消息，Shift + Enter 键换行，Enter 键发送";
  
  return (<>
    <div className={ "absolute bottom-0 left-0 w-full pt-2 bg-gradient-to-t from-white" }>
      <div className={ "max-w-3xl p-2 mx-auto mb-0 flex flex-col gap-2 relative" }>
        <div className="flex-1 flex flex-col w-full my-2 mx-2 bg-white">
          <div className="flex-1 flex gap-2">
            <TextField
              className=""
              label={ label }
              multiline
              fullWidth
              autoFocus
              maxRows={ 8 }
              value={ text }
              onChange={ (e) => {setText(e.target.value);} }
              disabled={ textAreaDisabled }
              onKeyDown={ sendMessage }
            />
            {
              false && <>
                <div className="flex flex-col justify-center">
                  <IconButton
                    onMouseDown={ handlePress }
                    onMouseUp={ handleRelease }
                    onMouseLeave={ handleRelease }
                    onTouchStart={ handlePress }
                    onTouchEnd={ handleRelease }
                  >
                    <KeyboardVoiceOutlined />
                  </IconButton>
                </div>
                <div className="flex flex-col justify-center">
                  <IconButton>
                    <KeyboardVoiceOutlined />
                  </IconButton>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default SendArea;
