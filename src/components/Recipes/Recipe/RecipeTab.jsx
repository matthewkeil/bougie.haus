import React, { Fragment } from "react";
import styles from "./Recipe.module.scss";
import { listify } from "../../helpers";

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

            stepText += listify(
              Object.entries(nameMap).map(([name, varieties]) =>
                varieties && varieties.length > 1
                  ? `${listify(varieties)} ${name}`
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

export default ({ recipe }) => (
  <div className={styles.tabContainer}>
    <IngredientsList recipe={recipe} />
    <StepsList recipe={recipe} />
  </div>
);
