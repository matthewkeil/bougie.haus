import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import styles from "./App.module.scss";

import {
  Notifier,
  Home,
  Register,
  Login,
  Recipe,
  NewRecipe,
  Ingredients,
  Ingredient,
  NewIngredient,
  EditIngredient
} from "./components";

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
          <Route path="/recipes/:canonical" component={Recipe} />
          <Route path="/ingredients/new" component={NewIngredient} />
          <Route path="/ingredients/:canonical/edit" component={EditIngredient} />
          <Route path="/ingredients/:canonical" component={Ingredient} />
          <Route path="/ingredients" component={Ingredients} />
        </Switch>
      </div>
    );
  }
}
