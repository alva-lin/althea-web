import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppEnv from "./common/env.ts";
import { useLogin } from "./hooks";
import Router from "./routes";

const App = () => {
  const { isAuthenticated, getAccessToken, isSetToken, setIsSetToken } = useLogin();
  const [ tokenInterceptor, setTokenInterceptor ] = useState<number | undefined>(undefined);
  
  useEffect(() => {
    document.title = AppEnv.App.Title;
  }, []);
  
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
  }, [ isAuthenticated, getAccessToken, isSetToken, setIsSetToken, tokenInterceptor, setTokenInterceptor ]);
  
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
};

export default App;
