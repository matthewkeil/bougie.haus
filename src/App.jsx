import React, { Component } from "react";
import { Route } from "react-router-dom";

import styles from "./App.module.scss";

import { Home, Register, Login, Recipe } from "./components";

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
        <Route path="/" exact component={Home} />
        <Route path="/auth/register" component={Register} />
        <Route path="/auth/login" exact component={Login} />
        <Route path="/recipe" component={Recipe} />
      </div>
    );
  }
}