import { Button } from "@mui/material";
import useLogin from "../hooks/useLogin.tsx";

const LogtoButton = () => {
  const { login, logout, isAuthenticated } = useLogin();
  
  return isAuthenticated
    ? <Button onClick={ async () => { await logout();} } > 注销 </Button >
    : <Button onClick={ async () => { await login();} } > 登录 </Button >;
  
};

export default LogtoButton;
