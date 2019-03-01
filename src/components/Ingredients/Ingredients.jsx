import React, { Component } from "react";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

import { ACT } from "../../store";
import { BaseLayout } from "../shared";
import editIcon from "../../assets/edit.svg";
import addIcon from "../../assets/add.svg";

import styles from "./Ingredients.module.scss";

class Ingredients extends Component {
  componentWillMount() {
    this.props.getAll();
  }

  render() {
    const { list } = this.props;
    return (
      <BaseLayout>
        <h1 className={styles.title}>Ingredients List</h1>
        <ul>
          <li className={styles.listItem}>
            <Link
              className={styles.listContent}
              to="/ingredients/new"
            >
              <span>Add a new ingredient</span>
            </Link>
            <IconButton>
              <img className={styles.iconButton} src={addIcon} alt="edit" />
            </IconButton>
          </li>
          {list.map(({ wiki: { titles: { canonical, display } } }, key) => (
            <li className={styles.listItem} key={key}>
              <Link
                className={styles.listContent}
                to={`/ingredients/${canonical || "new"}`}
              >
                <span>{display || `what you talkin bout' willis?`}</span>
              </Link>
              <IconButton>
                <Link to={`/ingredients/${canonical}/edit`}>
                  <img
                    className={styles.iconButton}
                    src={editIcon}
                    alt="edit"
                  />
                </Link>
              </IconButton>
            </li>
          ))}
        </ul>
      </BaseLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.ingredients.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: () => dispatch(ACT.ingredients.loadAllIngredients())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ingredients);
