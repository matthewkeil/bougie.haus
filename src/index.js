import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

import { createBrowserHistory } from "history";
import { ConnectedRouter } from "connected-react-router";

import configureStore from "./store";
import { Provider } from "react-redux";

import {SnackbarProvider} from 'notistack';

import App from "./App";
import "./index.module.scss";

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("material-ui-insertion")
});

const generateClassName = createGenerateClassName();

const history = createBrowserHistory();

const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <ConnectedRouter history={history}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ConnectedRouter>
    </JssProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
