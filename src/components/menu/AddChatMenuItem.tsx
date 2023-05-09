import { AddOutlined } from "@mui/icons-material";
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MenuItem from "./MenuItem.tsx";
import { useAppDispatch } from "../../store/hooks.ts";
import { setActiveChat } from "../../store/slice/Chat.Slice.tsx";

const AddChatMenuItem = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    dispatch(setActiveChat({ id: undefined }));
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate(`/`);
    }
  }, [ navigate, location, dispatch ]);

  return (
    <div className={ "my-border rounded-md" } >
      <MenuItem icon={ <AddOutlined /> } onClick={ onClick } >
        新建聊天
      </MenuItem >
    </div >
  );
};

export default AddChatMenuItem;
