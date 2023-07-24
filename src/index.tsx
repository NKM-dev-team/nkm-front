import React from "react";
import ReactDOM from "react-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import Notifier from "./components/services/Notifier";
import { SnackbarProvider } from "notistack";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const theme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#f50057",
    },
    background: {
      paper: "#181818",
    },
  },
});
const persistor = persistStore(store);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/hex-map-worker.ts")
      .then((registration) => {
        console.log(
          "ServiceWorker registration successful with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed:", error);
      });
  });
}
ReactDOM.render(
  // <React.StrictMode>

  <Provider store={store}>
    <GoogleOAuthProvider clientId="499337493287-c4ujkqhp18maais03ta50lvlnntlhomt.apps.googleusercontent.com">
      <PersistGate persistor={persistor}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
              <Notifier />
            </SnackbarProvider>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </PersistGate>
    </GoogleOAuthProvider>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
