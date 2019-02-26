import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { ACT } from "../../../store";

import styles from "./Recipe.module.scss";

function IngredientsList({ recipe: { ingredients } }) {
  return (
    <Fragment>
      <h2 className={styles.tabHeading}>Ingredients</h2>
      <ul>
        {Object.values(ingredients).map((ing, key) => (
          <li className={styles.ingredientsListItem} key={key}>
            <span className={styles.ingredientsQty}>{`${ing.qty.value} ${
              ing.qty.label
            }`}</span>
            <p>{ing.name.simple}</p>
          </li>
        ))}
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
            const nameMap = {};

            step.ingredients.forEach(id => {
              const name = ingredients[id].name.simple;

              const variety =
                !!ingredients[id].type && !!ingredients[id].type.variety
                  ? ingredients[id].type.variety
                  : undefined;

              if (!!variety) {
                if (!!nameMap[name]) nameMap[name].push(variety);
                else nameMap[name] = [variety];

                return;
              }

              nameMap[name] = !!nameMap[name] ? nameMap[name] : null;
            });

            function listize(array) {
              let listizeText = "";

              switch (array.length) {
                case 0:
                  return;
                case 1:
                  listizeText += array[0];
                  return;
                case 2:
                  listizeText += array.join(" and ");
                  break;
                default:
                  array.forEach((name, i) => {
                    switch (i) {
                      case array.length - 2:
                        return (listizeText += `${name} and `);
                      case array.length - 1:
                        return (listizeText += `${name}`);
                      default:
                        return (listizeText += `${name}, `);
                    }
                  });
              }

              return listizeText;
            }

            stepText += listize(
              Object.entries(nameMap).map(([name, varieties]) =>
                varieties && varieties.length > 1
                  ? `${listize(varieties)} ${name}`
                  : name
              )
            );
          }

          if (!!until) {
            stepText += ` until ${until}`;
          }

          stepText += ".";

          if (!!notes) {
            stepText += ` ${notes}`;
          }

          return (
            <li className={styles.stepsListItem} key={key}>
              <span className={styles.stepsProcess}>{process}</span>
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
    loadRecipe: id => dispatch(ACT.recipes.loadRecipe(id))
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
