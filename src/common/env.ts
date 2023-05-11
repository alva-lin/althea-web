type AppEnv = {
  App: {
    Name: string,
    Version: string,
    Description: string,
    Url: string,
  },
  Server: {
    BaseUrl: string,
    ApiPath: string,
    SignalRPath: string,
  }
  Logto: {
    Endpoint: string,
    AppId: string,
    LoginRedirectUrl: string,
    LogoutRedirectUrl: string,
    Resources: string[],
  }
}

const env = import.meta.env;
const AppEnv: AppEnv = {
  App: {
    Name: env.VITE_APP_NAME || "",
    Version: env.VITE_APP_VERSION || "",
    Description: env.VITE_APP_DESCRIPTION || "",
    Url: env.VITE_APP_URL || "",
  },
  Server: {
    BaseUrl: env.VITE_SERVER_BASE_URL || "",
    ApiPath: env.VITE_SERVER_API_PATH || "",
    SignalRPath: env.VITE_SERVER_SIGNALR_PATH || "",
  },
  Logto: {
    Endpoint: env.VITE_LOGTO_ENDPOINT || "",
    AppId: env.VITE_LOGTO_APPID || "",
    LoginRedirectUrl: env.VITE_LOGTO_LOGIN_REDIRECT_URL || "",
    LogoutRedirectUrl: env.VITE_LOGTO_LOGOUT_REDIRECT_URL || "",
    Resources: (env.VITE_LOGTO_RESOURCES || "").split(","),
  },
};

export default AppEnv;
