import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";

import NoSsr from "@material-ui/core/NoSsr";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { ACT } from "../../store";
import { validators, renderTextField } from "../../helpers";

import styles from "./NewIngredient.module.scss";

const { required, testWikipediaUrl } = validators;

const NewIngredient = props => {
  const { url, getTitleInfo, info, handleSubmit } = props;

  const catchEnter = e => {
    if (e.key === "Enter") {
      getTitleInfo(url)();
    }
  };

  return (
    <Fragment>
      <img className={styles.logo} src="/images/logo-600-600.svg" alt="logo" />
      <Paper className={styles.paper} elevation={6}>
        <h1 className={styles.title}>Add Ingredient</h1>
        <NoSsr>
          <form onSubmit={handleSubmit(info)}>
            {/* <Field
              name="name"
              placeholder="name"
              label="search for an ingredient"
              fullWidth={true}
              className={styles.input}
              type="text"
              component={renderTextField}
            /> */}
            <Field
              name="url"
              label="wikipedia page"
              validate={[required, testWikipediaUrl]}
              placeholder={`https://en.wikipidia.org/wiki/`}
              fullWidth={true}
              passedClasses={{
                input: styles.input,
                warnClassName: styles.warn,
                errorClassName: styles.error
              }}
              component={renderTextField}
              onKeyDown={catchEnter}
              onBlur={getTitleInfo(url)}
            />
            <Button
              disabled={!info.pageid}
              className={styles.button}
              variant="contained"
              type="submit"
            >
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
    url: selector(state, "url"),
    info: state.ingredients.new.info,
    normalized: state.ingredients.new.normalized
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getTitleInfo: url => () => {
      dispatch(ACT.wiki.getTitleInfo(url));
    },
    handleSubmit: info => e => {
      e.preventDefault();
      
      const { pageid, titles, thumbnail, originalimage, extract } = info;
    
      dispatch(ACT.ingredients.attemptCreateIngredient({ pageid, titles, thumbnail, originalimage, extract }));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form })(NewIngredient));
