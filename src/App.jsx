import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import styles from "./App.module.scss";

import { Notifier, Home, Register, Login, Recipe, NewRecipe, Ingredient } from "./components";

export default class App extends Component {
  state = {
    user: {
      id: "eoiuhy892hntgkjfng"
    }
  };

  render() {
    // const { user } = this.state;

    return (
      <div className={styles.container}>
        <Notifier />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth/register" component={Register} />
          <Route path="/auth/login" exact component={Login} />
          <Route path="/recipes/new" component={NewRecipe} />
          <Route path="/recipes/:urlName" component={Recipe} />
          <Route path="/ingredients/:urlName" component={Ingredient} />
        </Switch>
      </div>
    );
  }
}
