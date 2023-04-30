import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "./styles/main.css";
import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { LogtoConfig, LogtoProvider } from "@logto/react";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import AppEnv from "./common/env.ts";

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
});

const logtoConfig: LogtoConfig = {
  endpoint: AppEnv.Logto.Endpoint,
  appId: AppEnv.Logto.AppId,
};

root.render(
  <React.StrictMode >
    <Provider store={ store } >
      <LogtoProvider config={ logtoConfig } >
        <StyledEngineProvider injectFirst >
          <ThemeProvider theme={ theme } >
            <BrowserRouter >
              <CssBaseline />
              <DevSupport ComponentPreviews={ ComponentPreviews }
                          useInitialHook={ useInitial }
              >
                <App />
              </DevSupport >
            </BrowserRouter >
          </ThemeProvider >
        </StyledEngineProvider >
      </LogtoProvider >
    </Provider >
  </React.StrictMode >
);
