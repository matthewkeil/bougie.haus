import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";

import NoSsr from "@material-ui/core/NoSsr";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { ACT } from "../../store";
import { validate, canonical, renderTextField } from "../helpers";

import styles from "./NewIngredient.module.scss";

const { required, testWikipediaUrl } = validate;

const NewIngredient = ({ name, wiki, varieties, attemptCreateIngredient }) => {

  return (
    <Fragment>
      <img className={styles.logo} src="/images/logo-600-600.svg" alt="logo" />
      <Paper className={styles.paper} elevation={6}>
        <h1 className={styles.title}>Add Ingredient</h1>
        <NoSsr>
          <form onSubmit={attemptCreateIngredient({ name, wiki, varieties })}>
            <Field
              name="name"
              placeholder="name"
              label="search for an ingredient"
              fullWidth={true}
              className={styles.input}
              type="text"
              component={renderTextField}
            />
            <Field
              name="wiki"
              validate={[required, testWikipediaUrl]}
              placeholder={`wikipidia.org/wiki/${canonical(name || "")} `}
              fullWidth={true}
              className={styles.input}
              component={renderTextField}
            />
            <Button className={styles.button} variant="contained" type="submit">
              Add
            </Button>
          </form>
        </NoSsr>
      </Paper>
    </Fragment>
  );
};

const form = "newIngredient";

const mapStateToProps = state => {
  const selector = formValueSelector(form);
  return {
    name: selector(state, "name"),
    wiki: selector(state, "wiki")
  };
};

function mapDispatchToProps(dispatch) {
  return {
    attemptCreateIngredient: ({ name, wiki, varieties }) => e => {
      e.preventDefault();
      dispatch(
        ACT.ingredients.attemptCreateIngredient({ name, wiki, varieties })
      );
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form })(NewIngredient));
