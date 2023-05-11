import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useLogin } from "./hooks";
import Router from "./routes";

const App = () => {
  const { isAuthenticated, getAccessToken, isSetToken, setIsSetToken } = useLogin();

  useEffect(() => {
    async function initTokenInterceptor() {
      if (isAuthenticated && !isSetToken) {
        const accessToken = await getAccessToken();
        axios.interceptors.request.use(function (config) {
          if (accessToken) {
            config.headers.Authorization = `Bearer ${ accessToken }`; // 将 token 附加到请求头中
          }
          return config;
        });
        setIsSetToken(true);
      }
    }

    initTokenInterceptor().then();
  }, [ isAuthenticated, getAccessToken, isSetToken, setIsSetToken ]);

  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
};

export default App;
