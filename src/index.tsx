import React from "react";
import ReactDOM from "react-dom";
import Router from "./components/Router";
import { store } from "./app/store";
import { Provider } from "react-redux";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme, // https://stackoverflow.com/a/64135466/7136056
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import Notifier from "./components/Notifier";
import { SnackbarProvider } from "notistack";
import BackgroundService from "./components/BackgroundService";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#1a71b8",
    },
    background: {
      paper: "#181818",
      default: "#0e0b0b",
    },
  },
});
const persistor = persistStore(store);

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Notifier />
        </SnackbarProvider>
        <CssBaseline />
        <Router />
        <BackgroundService />
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
