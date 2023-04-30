import { useLogto } from "@logto/react";
import { useCallback } from "react";
import AppEnv from "../common/env.ts";

const useLogin = () => {
  const { signIn, signOut, isAuthenticated } = useLogto();
  
  const login = useCallback(async () => {
    return signIn(AppEnv.Logto.LoginRedirectUrl);
  }, [ signIn ]);
  
  const logout = useCallback(async () => {
    return signOut(AppEnv.Logto.LogoutRedirectUrl);
  }, [ signOut ]);
  
  return {
    login,
    logout,
    isAuthenticated
  };
};

export default useLogin;
