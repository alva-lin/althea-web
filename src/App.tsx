import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppEnv from "./common/env.ts";
import { useLogin } from "./hooks";
import Router from "./routes";

const App = () => {
  const { isAuthenticated, getAccessToken, isSetToken, setIsSetToken, login } = useLogin();
  const [ tokenInterceptor, setTokenInterceptor ] = useState<number | undefined>(undefined);
  
  const queryClient = useQueryClient();
  
  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        onError: (error) => {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 401 && !isAuthenticated) {
            login();
          }
          throw error;
        }
      }
    });
  }, [ isAuthenticated, login, queryClient ]);
  
  useEffect(() => {
    document.title = AppEnv.App.Title;
  }, []);
  
  useEffect(() => {
    const time = setTimeout(() => {
      if (!isAuthenticated) {
        login();
      }
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, [ isAuthenticated, login ]);
  
  useEffect(() => {
    async function initTokenInterceptor() {
      if (isAuthenticated && !isSetToken) {
        if (tokenInterceptor !== undefined) {
          axios.interceptors.request.eject(tokenInterceptor);
        }
        const interceptor = axios.interceptors.request.use(async function (config) {
          const accessToken = await getAccessToken();
          config.headers.Authorization = `Bearer ${ accessToken }`; // 将 token 附加到请求头中
          return config;
        });
        setTokenInterceptor(interceptor);
        setIsSetToken(true);
      }
    }
    
    initTokenInterceptor().then();
  }, [ isAuthenticated, getAccessToken, isSetToken, setIsSetToken, tokenInterceptor, setTokenInterceptor, login ]);
  
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
};

export default App;
