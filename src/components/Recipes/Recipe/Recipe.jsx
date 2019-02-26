import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


import {ACT} from '../../../store'

import styles from "./Recipe.module.scss";

function IngredientsList({ recipe: { ingredients } }) {
  return (
    <Fragment>
      <h2 className={styles.tabHeading}>Ingredients</h2>
      <ul>
        {ingredients.map(ing => {
          const { id, qty, name } = ing;
          return (
            <li className={styles.ingredientListItem} key={id}>
                <span className={styles.ingredientQty}>{`${qty.value} ${qty.label}`}</span>
                <p>- {name.display}</p>
              {/* {qty.value} {qty.label} - {name.display} */}
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

function StepsList({ recipe: { ingredients, steps } }) {
  return (
    <Fragment>
      <h2 className={styles.tabHeading}>Steps</h2>
      <ul>
        {steps.map((step, key) => {
          const { process, notes, until } = step;

          let stepText = "";

          if (step.ingredients && !!step.ingredients.length) {
            const ingredientNames = step.ingredients
              .map(id => ingredients.filter(ing => ing.id === id)[0])
              .map(ing => ing.name.display);

            switch (ingredientNames.length) {
              case 0:
                break;
              case 1:
                stepText += ingredientNames[0];
                break;
              case 2:
                stepText += `${ingredientNames[0]} and ${ingredientNames[1]}`;
                break;
              default:
                ingredientNames.forEach((name, i) => {
                  switch (i) {
                    case ingredientNames.length - 2:
                      return (stepText += `${name} and `);
                    case ingredientNames.length - 1:
                      return (stepText += `${name}`);
                    default:
                      return (stepText += `${name}, `);
                  }
                });
            }
          }

          if (!!until) {
            stepText += ` until ${until}`;
          }

          stepText += '.';

          if (!!notes) {

              stepText += ` ${notes}`
          }

          return (
            <li className={styles.stepListItem} key={key}>
              <span className={styles.stepProcess}>{process}</span>
              <p>{stepText}</p>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

function mapStateToProps(state) {
  return {
      recipe: state.recipes.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
      loadRecipe: (id) => dispatch(ACT.recipes.loadRecipe(id))
  };
}

class Recipe extends Component {
  state = {
    activeTab: 0
  };

  componentDidMount() {
      this.props.loadRecipe(this.props.match.params.urlName);
  }

  handleTabChange = (e, value) => {
      e.preventDefault();
    this.setState({activeTab: value});
  };

  render() {
    const { activeTab} = this.state;
    const { recipe } = this.props;
    
    return !recipe ? null : (
      <Fragment>
        <img className={styles.img} src={recipe.img.url} alt={recipe.img.alt} />
        <div className={styles.container}>
          <h1 className={styles.h1}>{recipe.name}</h1>
          <p>{recipe.slug}</p>
          <Paper className={styles.paper} elevation={2}>
            <Tabs value={activeTab} onChange={this.handleTabChange}>
              <Tab label="recipe" />
              <Tab label="versions" />
              <Tab label="info" />
            </Tabs>
            {activeTab === 0 && (
              <div className={styles.tabContainer}>
                <IngredientsList recipe={recipe} />
                <StepsList recipe={recipe} />
              </div>
            )}
          </Paper>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
