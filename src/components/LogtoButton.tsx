import { useLogto } from "@logto/react";
import { Button } from "@mui/material";
import { useCallback } from "react";

const LogtoButton = () => {
  const { signIn, signOut, isAuthenticated } = useLogto();
  
  const login = useCallback(() => {
    const redirectUrl = import.meta.env.VITE_LOGTO_LOGIN_REDIRECT_URL || "";
    signIn(redirectUrl).then();
  }, [ signIn ]);
  
  const logout = useCallback(() => {
    const redirectUrl = import.meta.env.VITE_LOGTO_LOGOUT_REDIRECT_URL || "";
    signOut(redirectUrl).then();
  }, [ signOut ]);
  
  if (isAuthenticated) {
    return <Button onClick={ logout } > 注销 </Button >;
  }
  
  return <Button onClick={ login } > 登录 </Button >;
};

export default LogtoButton;
