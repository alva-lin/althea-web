import { Divider } from "@mui/material";
import AddChatMenuItem from "./AddChatMenuItem.tsx";
import ChatList from "./ChatList.tsx";
import Logo from "./Logo.tsx";
import LogtoMenuItem from "./LogtoMenuItem.tsx";

const Menu = () => {
  return (
    <div className={ "h-full w-full flex flex-col gap-4 px-2 py-2 bg-gray-100" } >
      <div className={ "hidden2" } >
        <Logo />
      </div >
      <div >
        <AddChatMenuItem />
      </div >
      <div className={ "flex-1" } >
        <ChatList />
      </div >
      <div className={ "flex flex-col gap-2" } >
        <Divider flexItem />
        <div >
          <LogtoMenuItem />
        </div >
      </div >
    </div >
  );
};

export default Menu;
