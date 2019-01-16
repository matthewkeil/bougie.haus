import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
      useNextVariants: true
    },
    breakpoints: {
      values: {
        xs: 480,
        sm: 736
      }
    },
    palette: {
      primary: {
        light: '#803ad8',
        main: '#3b1051',
        dark: '#260d4c' 
      },
      secondary: {
        main: '#96ab1e',
        dark: '#697815'
      },
      error: {
        main: '#f09e2a'
      }
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
