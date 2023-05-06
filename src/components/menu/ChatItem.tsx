import { ChatBubbleOutlineOutlined, CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { useCallback, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatId, ChatInfo } from "../../services/chat/models.ts";
import { IconButton, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteChat, RenameChat } from "../../services/chat/api.ts";

export interface ChatItemProps {
  chatInfo: ChatInfo;
}

const ChatItem = ({ chatInfo }: ChatItemProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const chatId = Number(params["id"]) as ChatId;
  const [isActive, setIsActive] = useState(false);

  const [toolState, setToolState] = useState(0); // 0: normal, 1: updateTitle, 2: deleteChat
  const [title, setTitle] = useState(chatInfo.name);

  const queryClient = useQueryClient();
  const renameChatMutation = useMutation([ "chats", "RenameChat" ], RenameChat, {
    onSuccess: () => {
      queryClient.invalidateQueries([ "chats", "getList" ])
    },
  });
  const deleteChatMutation = useMutation([ "chats", "DeleteChat" ], DeleteChat, {
    onSuccess: () => {
      queryClient.invalidateQueries([ "chats", "getList" ])
      queryClient.invalidateQueries([ "chats", "getOne", chatInfo.id ])
    },
  });
  const toolDisabled = renameChatMutation.isLoading || deleteChatMutation.isLoading;

  useEffect(() => {
    setIsActive(chatId === chatInfo.id);
  }, [chatId, chatInfo.id])

  useEffect(() => {
    setToolState(0);
  }, [isActive]);

  const onClick = useCallback(() => {
    navigate(`/chat/${ chatInfo.id }`);
  }, [ chatInfo, navigate ]);

  const updateTitle = useCallback(() => {
    if (title === chatInfo.name) {
      return;
    }
    if (title === "") {
      setTitle(chatInfo.name);
      return;
    }
    renameChatMutation.mutate({ id: chatInfo.id, title: title });
  }, [chatInfo.id, chatInfo.name, title, renameChatMutation]);

  const deleteChat = useCallback(() => {
    deleteChatMutation.mutate({ id: chatInfo.id });
  }, [chatInfo.id, deleteChatMutation]);

  const leftButtonAction = useCallback(() => {
    if (toolState === 0) {
      setToolState(1);
    } else if (toolState === 1) { // update title
      updateTitle();
      setToolState(0);
    } else if (toolState === 2) { // delete chat
      deleteChat();
      setToolState(0);
    }
  }, [toolState, updateTitle, deleteChat]);
  const rightButtonAction = useCallback(() => {
    if (toolState === 0) {
      setToolState(2);
    } else {
      setToolState(0);
    }
  }, [toolState]);

  return (<div className={ "my-menu-item my-no-select gap-2" + (isActive ? ' active' : '') } onClick={ onClick } >
    <div className={ "flex-none flex flex-col justify-center" } >
      <ChatBubbleOutlineOutlined sx={ { "fontSize": 20 } } />
    </div >
    <div className="chat-name" >
      { toolState === 1 ?
        <TextField autoFocus variant="standard" size={"small"}
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              leftButtonAction();
            }
          }}
          onBlur={() => {
            leftButtonAction();
          }}
        />
        : <>{ toolState === 2 ? "是否删除聊天" : title }</>
      }
      <div className="gradient-mask"></div >
    </div >
    <div className="chat-name-tool" >
      <div>
        <IconButton size="small" disabled={ toolDisabled } onClick={ leftButtonAction }>
          { toolState === 0 ? <EditOutlined fontSize="small" /> : <CheckOutlined fontSize="small" /> }
        </IconButton>
      </div>
      <div>
        <IconButton size="small" disabled={ toolDisabled } onClick={ rightButtonAction }>
          { toolState === 0 ? <DeleteOutlined fontSize="small" /> : <CloseOutlined fontSize="small" /> }
        </IconButton>
      </div>
    </div>
  </div >);
};

export default ChatItem;
