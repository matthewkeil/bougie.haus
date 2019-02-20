import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

import { BrowserRouter as Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import App from "./App";
import './index.module.scss';


const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('material-ui-insertion')
});

const generateClassName = createGenerateClassName();

const history = createHistory();

const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <Router>
        <App />
      </Router>
    </JssProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
