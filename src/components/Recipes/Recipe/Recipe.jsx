import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { ACT } from "../../../store";
import styles from "./Recipe.module.scss";

import RecipeTab from "./RecipeTab";

const tabs = {
  recipe: RecipeTab,
//   resources: ({ recipe }) => (
//     <div className={styles.tabContainer}>
//       {/* <IngredientsList recipe={recipe} />
//       <StepsList recipe={recipe} /> */}
//     </div>
//   ),
//   versions: ({ recipe }) => (
//     <div className={styles.tabContainer}>
//       {/* <IngredientsList recipe={recipe} />
//       <StepsList recipe={recipe} /> */}
//     </div>
//   )
};

class Recipe extends Component {
  state = {
    activeTab: "recipe"
  };

  componentDidMount() {
    this.props.loadRecipe(this.props.match.params.canonical);
  }

  handleTabChange = (e, value) => {
    e.preventDefault();
    this.setState({ activeTab: value });
  };

  render() {
    const { activeTab } = this.state;
    const { recipe } = this.props;

    return !recipe ? null : (
      <Fragment>
        <img className={styles.img} src={recipe.img.url} alt={recipe.img.alt} />
        <div className={styles.container}>
          <h1 className={styles.h1}>{recipe.name}</h1>
          <p>{recipe.slug}</p>
          <Paper className={styles.paper} elevation={2}>
            <Tabs value={activeTab} onChange={this.handleTabChange}>
              {Object.keys(tabs).map((tab, key) => (
                <Tab value={tab} label={tab} key={key} />
              ))}
            </Tabs>
            {tabs[activeTab](this.props)}
          </Paper>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipes.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadRecipe: canonical => dispatch(ACT.recipes.loadRecipe(canonical))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
