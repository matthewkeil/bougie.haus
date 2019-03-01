import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";

import { ACT } from "../../store";

import styles from "./Ingredient.module.scss";

class NewIngredient extends Component {
  componentWillMount() {
    this.props.clearIngredient()
  }

  componentDidMount() {
    this.props.loadIngredient(this.props.match.params.canonical);
  }

  render() {
    if (!Object.keys(this.props.ingredient).length) return null;

    const {
      wiki: {
        titles: { display },
        thumbnail,
        originalimage,
        extract
      }
    } = this.props.ingredient;

    const src = !!originalimage
      ? originalimage.source
      : !!thumbnail
      ? thumbnail.source
      : null;

    return (
      <Fragment>
        <img
          className={styles.logo}
          src="/images/logo-600-600.svg"
          alt="logo"
        />
        <Paper className={styles.paper} elevation={6}>
          {!!src && <img className={styles.img} src={src} alt={display} />}
          <h1 className={styles.title}>{display}</h1>
          <p>{extract}</p>
        </Paper>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredient: state.ingredients.current
  };
};

function mapDispatchToProps(dispatch) {
  return {
    clearIngredient: () => dispatch(ACT.ingredients.resetIngredient()),
    loadIngredient: canonical =>
      dispatch(ACT.ingredients.loadIngredient({ canonical }))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewIngredient);
