import { AddOutlined } from "@mui/icons-material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem.tsx";

const AddChatMenuItem = () => {
  
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/`);
  }, [ navigate ]);
  
  return (
    <div className={ "my-border rounded-md" } >
      <MenuItem icon={ <AddOutlined /> } onClick={ onClick } >
        新建聊天
      </MenuItem >
    </div >
  );
};

export default AddChatMenuItem;
