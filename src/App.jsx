import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import './App.css';

import {RecipeList} from './components';
import {NewRecipe} from './components';


const styles = theme => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.dark
  },
  paper: {
    backgroundColor: 'rgba(255, 255, 255, .85)',
    position: 'relative',
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.up('xs')]: {
      maxWidth: '72rem',
      width: 'calc(100% - 4rem)'
    }
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.container}>
          <Paper className={classes.paper}>
            <Router class="App-content">
              <Fragment>
                <Route path="/recipes" component={RecipeList} />
                <Route path="/recipes/new" component={NewRecipe} />
                <Route path="/recipes/:name" component={RecipeList} />
              </Fragment>
            </Router>
          </Paper>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);
