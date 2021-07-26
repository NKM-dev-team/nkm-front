import React from "react";
import ReactDOM from "react-dom";
import Router from "./components/Router";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme, // https://stackoverflow.com/a/64135466/7136056
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

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
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
