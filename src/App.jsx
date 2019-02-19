import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import styles from './App.module.scss';

import {Home, Register, Login} from './components';


export default class App extends Component {

  state = {
    user: {
      id: 'eoiuhy892hntgkjfng'
    }
  };
  
  render() {
    
    // const { user } = this.state;

    return (
      <div className={styles.container}>
        <Route path="/" exact component={Home} />
        <Route path="/users/register" component={Register} />
        <Route path="/users/login" component={Login} />} />
        {/* <Route path="/recipes" component={RecipeList} />
        <Route path="/recipes/new" component={NewRecipe} />
        <Route path="/recipes/:name" component={RecipeList} /> */}
      </div>
    );
  }
}