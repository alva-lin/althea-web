import { useLogto } from "@logto/react";
import { useCallback, useState } from "react";
import AppEnv from "../common/env.ts";

const useLogin = () => {
  const { signIn, signOut, isAuthenticated, getAccessToken } = useLogto();
  const [isSetToken, setIsSetToken] = useState(false);
  
  const login = useCallback(async () => {
    return signIn(AppEnv.Logto.LoginRedirectUrl);
  }, [ signIn ]);
  
  const logout = useCallback(async () => {
    return signOut(AppEnv.Logto.LogoutRedirectUrl);
  }, [ signOut ]);
  
  return {
    login,
    logout,
    getAccessToken,
    isAuthenticated,
    isSetToken,
    setIsSetToken
  };
};

export default useLogin;
