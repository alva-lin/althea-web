import { useLogto } from "@logto/react";
import axios from "axios";
import { useEffect, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import AppEnv from "./common/env.ts";
import Router from "./routes";


const App = () => {
  const { isAuthenticated, getAccessToken } = useLogto();
  const tokenInterceptor = useRef<number | undefined>(undefined);
  
  useEffect(() => {
    async function initTokenInterceptor() {
      if (isAuthenticated) {
        const accessToken = await getAccessToken(AppEnv.Logto.Resources[0]);
        console.debug("get accessToken", accessToken);
        if (tokenInterceptor.current) {
          console.debug("remove tokenInterceptor", tokenInterceptor.current);
          axios.interceptors.request.eject(tokenInterceptor.current);
        }
        tokenInterceptor.current = axios.interceptors.request.use(function (config) {
          if (accessToken) {
            config.headers.Authorization = `Bearer ${ accessToken }`; // 将 token 附加到请求头中
          }
          return config;
        });
        console.debug("add tokenInterceptor", tokenInterceptor.current);
      }
    }
    
    initTokenInterceptor().then();
  }, [ isAuthenticated, getAccessToken, tokenInterceptor ]);
  
  return (
    <>
      <BrowserRouter >
        <Router />
      </BrowserRouter >
    </>
  );
};

export default App;
