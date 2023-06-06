import { LogtoConfig, LogtoProvider } from "@logto/react";
import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import * as locales from "@mui/material/locale";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import AppEnv from "./common/env.ts";
import { Response } from "./services/index.ts";
import { store } from "./store";
import "./styles/index.css";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
}, locales.zhCN);

const logtoConfig: LogtoConfig = {
  endpoint: AppEnv.Logto.Endpoint,
  appId: AppEnv.Logto.AppId,
  resources: AppEnv.Logto.Resources,
};

axios.defaults.baseURL = AppEnv.Server.BaseUrl + AppEnv.Server.ApiPath;

axios.interceptors.response.use((response) => {
  const data = response.data as Response<unknown>;
  if (data.code && data.code !== 0) {
    throw new Error(data.message);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data as any;
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      select: (response) => {
        const { data } = response as { data: unknown };
        return data;
      },
    },
  },
});

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <QueryClientProvider client={ queryClient }>
        <LogtoProvider config={ logtoConfig }>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={ theme }>
              <CssBaseline enableColorScheme />
              <App />
            </ThemeProvider>
          </StyledEngineProvider>
        </LogtoProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
