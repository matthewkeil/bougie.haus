import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import styles from './App.module.scss';

import {Home, Register, Login, RecipeList, NewRecipe} from './components';

export default class App extends Component {

  state = {
    user: {
      id: 'eoiuhy892hntgkjfng'
    }
  };
  
  render() {
    
    const { user } = this.state;

    return (
      <Fragment>
        <Router class="App-content">
          <div className={styles.container}>
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