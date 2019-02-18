import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import './App.css';

import {AppBar} from './components/shared';
import {Home, Register, Login, RecipeList, NewRecipe} from './components';

const styles = theme => ({
  container: {
    position: 'absolute',
    // marginTop: '56px',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    backgroundColor: theme.palette.primary.dark,
    // [theme.breakpoints.up('sm')]: {
    //   marginTop: '64px'
    // }
  }
});

class App extends Component {

  state = {
    user: {
      id: 'eoiuhy892hntgkjfng'
    }
  };
  
  render() {
    
    const { classes } = this.props;
    const { user } = this.state;

    return (
      <Fragment>
        <Router class="App-content">
          <div className={classes.container}>
            <Route path="/" exact component={Home} />
            <Route path="/users/register" component={Register} />
            <Route path="/users/login" component={Login} />
            {/* <Route path="/recipes" component={RecipeList} />
            <Route path="/recipes/new" component={NewRecipe} />
            <Route path="/recipes/:name" component={RecipeList} /> */}
          </div>
        </Router>
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);
