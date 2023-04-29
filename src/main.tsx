import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import './styles/main.css';
import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { LogtoConfig, LogtoProvider } from "@logto/react";

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
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APPID,
};

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <LogtoProvider config={ logtoConfig }>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={ theme }>
            <BrowserRouter>
              <CssBaseline />
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </StyledEngineProvider>
      </LogtoProvider>
    </Provider>
  </React.StrictMode>
);
