import { LoginOutlined, LogoutOutlined } from "@mui/icons-material";
import { useCallback } from "react";
import useLogin from "../../hooks/useLogin.tsx";
import MenuItem from "./MenuItem.tsx";

const LogtoMenuItem = () => {
  const { login, logout, isAuthenticated } = useLogin();
  
  const onClick = useCallback(async () => {
    if (isAuthenticated) {
      await logout();
    } else {
      await login();
    }
  }, [ isAuthenticated, login, logout ]);
  
  const text = isAuthenticated ? "注销" : "登录";
  
  const icon = isAuthenticated
    ? <LogoutOutlined />
    : <LoginOutlined />;
  
  return (
    <MenuItem onClick={ onClick } icon={ icon } >
      { text }
    </MenuItem >
  );
  
};

export default LogtoMenuItem;
