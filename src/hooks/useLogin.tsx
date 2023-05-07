import { useLogto } from "@logto/react";
import { useCallback } from "react";
import AppEnv from "../common/env.ts";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { selectAuthInfo, setIsSetToken } from "../store/slice/Auth.Slice.tsx";

const useLogin = () => {
  const { signIn, signOut, isAuthenticated, getAccessToken } = useLogto();
  const { isSetToken } = useAppSelector(selectAuthInfo);
  const dispatch = useAppDispatch();
  
  const login = useCallback(async () => {
    return signIn(AppEnv.Logto.LoginRedirectUrl);
  }, [ signIn ]);
  
  const logout = useCallback(async () => {
    return signOut(AppEnv.Logto.LogoutRedirectUrl);
  }, [ signOut ]);
  
  const updateIsSetToken = useCallback((isSetToken: boolean) => {
    dispatch(setIsSetToken(isSetToken));
  }, [ dispatch ]);
  
  const getToken = useCallback(async () => {
    return await getAccessToken(AppEnv.Logto.Resources[0]) || "";
  }, [ getAccessToken ]);
  
  return {
    login,
    logout,
    getAccessToken: getToken,
    isAuthenticated,
    isSetToken,
    setIsSetToken: updateIsSetToken,
  };
};

export default useLogin;
