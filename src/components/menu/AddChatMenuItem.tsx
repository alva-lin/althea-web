import { AddOutlined } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { CreateChat } from "../../services/chat/api.ts";
import MenuItem from "./MenuItem.tsx";

const AddChatMenuItem = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation([ "chats", "addChat" ], CreateChat, {
    onSuccess: () => {
      queryClient.invalidateQueries([ "chats" ]).then();
    }
  });
  
  const onClick = useCallback(() => {
    mutation.mutate();
  }, [ mutation ]);
  
  return (
    <div className={ "my-border rounded-md" } >
      <MenuItem icon={ <AddOutlined /> } onClick={ onClick } >
        新建聊天
      </MenuItem >
    </div >
  );
};

export default AddChatMenuItem;
