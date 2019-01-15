import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from './components/shared/AppBar';

import './App.css';

import {Recipes} from './components';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: '#1a237e'
    },
    secondary: {
      main: '#e64a19'
    },
  }
});

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <AppBar />
          <main className="App-main">
            <Router class="App-content">
              <Route path="/" exact component={Recipes} />
            </Router>
          </main>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default App;
