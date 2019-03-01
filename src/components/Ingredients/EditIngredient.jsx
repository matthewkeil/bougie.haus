import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import IconButton from "@material-ui/core/IconButton";
import NoSsr from "@material-ui/core/NoSsr";

import { ACT } from "../../store";
import { BaseLayout } from "../shared";
import { renderTextField } from "../../helpers";

import deleteIcon from "../../assets/delete.svg";
import checkCircleIcon from "../../assets/check_circle.svg";
import styles from "./EditIngredient.module.scss";

class EditIngredient extends Component {
  componentDidMount() {
    this.props.loadIngredient(this.props.match.params.canonical);
  }

  render() {
    if (!Object.keys(this.props.ingredient).length) return null;

    const { ingredient, deleteIngredient, extract, handleSubmit } = this.props;
    const {
      wiki: {
        titles: { display, canonical },
        thumbnail,
        originalimage
      }
    } = ingredient;

    const src = !!originalimage
      ? originalimage.source
      : !!thumbnail
      ? thumbnail.source
      : null;

    const catchEnter = e => {
      if (e.key === "Enter") {
        handleSubmit(extract);
      }
    };

    return (
      <BaseLayout>
        {!!src && <img className={styles.img} src={src} alt={display} />}
        <IconButton onClick={deleteIngredient(canonical)}>
          <img className={styles.iconButton} src={deleteIcon} alt="edit" />
        </IconButton>
        <span className={styles.title}>{display}</span>
        <NoSsr>
          <form onSubmit={handleSubmit({ ingredient, extract })}>
            <Field
              name="extract"
              fullWidth={true}
              multiline={true}
              component={renderTextField}
              onKeyDown={catchEnter}
            />
            <IconButton type="submit">
              <img
                className={styles.iconButton}
                src={checkCircleIcon}
                alt="ok"
              />
            </IconButton>
          </form>
        </NoSsr>
      </BaseLayout>
    );
  }
}

const form = "editIngredient";
const selector = formValueSelector(form);

const mapStateToProps = state => {
  const current = state.ingredients.current;

  return {
    ingredient: current,
    initialValues: current.wiki ? { extract: current.wiki.extract } : {},
    extract: selector(state, "extract")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadIngredient: canonical =>
      dispatch(ACT.ingredients.loadIngredient({ canonical })),
    handleSubmit: ({ ingredient, extract }) => e => {
      e.preventDefault();
      ingredient.wiki.extract = extract;
      dispatch(ACT.ingredients.attemptEditIngredient({ ingredient }));
    },
    deleteIngredient: canonical => e => {
      dispatch(ACT.ingredients.deleteIngredient(canonical));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form, enableReinitialize: true })(EditIngredient));
