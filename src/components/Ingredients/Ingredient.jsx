import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

import { listify } from "../helpers";
import {ACT} from '../../store';

import styles from "./Ingredient.module.scss";

function mapStateToProps(state) {
  return {
    ingredient: state.ingredients.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadIngredient: urlName => dispatch(ACT.ingredients.loadIngredient({urlName}))
  };
}

class Ingredient extends Component {

    componentWillMount() {
        this.props.loadIngredient(this.props.match.params.urlName);
    }

  render() {
    const { ingredient } = this.props;

    if (!ingredient) return null;

    const { name } = ingredient;

    return (
      <Fragment>
        <img
          className={styles.logo}
          src="/images/logo-600-600.svg"
          alt="logo"
        />
        <Paper className={styles.paper} elevation={6}>
          <h1>{name.common}</h1>
          {!!name.aliases && <p class={styles.aliases}>{listify(name.aliases)}</p>}
        </Paper>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);
