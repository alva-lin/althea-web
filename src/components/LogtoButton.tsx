import { useLogto } from "@logto/react";
import { Button } from "@mui/material";
import { useCallback } from "react";
import AppEnv from "../common/env.ts";

const LogtoButton = () => {
  const { signIn, signOut, isAuthenticated } = useLogto();
  
  const login = useCallback(() => {
    const redirectUrl = AppEnv.Logto.LoginRedirectUrl;
    signIn(redirectUrl).then();
  }, [ signIn ]);
  
  const logout = useCallback(() => {
    const redirectUrl = AppEnv.Logto.LogoutRedirectUrl;
    signOut(redirectUrl).then();
  }, [ signOut ]);
  
  if (isAuthenticated) {
    return <Button onClick={ logout } > 注销 </Button >;
  }
  
  return <Button onClick={ login } > 登录 </Button >;
};

export default LogtoButton;
