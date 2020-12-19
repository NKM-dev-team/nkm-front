import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './components/App';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {blue, pink} from "@material-ui/core/colors";
import {CssBaseline} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: blue,
    secondary: pink,
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);