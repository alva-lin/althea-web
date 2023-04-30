type AppEnv = {
    HostUrl: string,
    ServerUrl: string,
    Logto: {
        Endpoint: string,
        AppId: string,
        LoginRedirectUrl: string,
        LogoutRedirectUrl: string,
        Resources: string,
        Token: string
    }
}

const env = import.meta.env;
const AppEnv: AppEnv = {
    HostUrl: env.VITE_HOST_URL || '',
    ServerUrl: env.VITE_SERVER_URL || '',
    Logto: {
        Endpoint: env.VITE_LOGTO_ENDPOINT || '',
        AppId: env.VITE_LOGTO_APPID || '',
        LoginRedirectUrl: env.VITE_LOGTO_LOGIN_REDIRECT_URL || '',
        LogoutRedirectUrl: env.VITE_LOGTO_LOGOUT_REDIRECT_URL || '',
        Resources: env.VITE_LOGTO_RESOURCES || '',
        Token: env.VITE_LOGTO_TOKEN || '',
    },
}

export default AppEnv;
