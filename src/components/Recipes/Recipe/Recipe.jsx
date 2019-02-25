import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import styles from "./Recipe.module.scss";

const recipe = {
  name: "Masala Chai",
  img: {
    url:
      "https://motherwouldknow.com/wp-content/uploads/2017/04/2017-04-24-chai-madeleines-spices-and-tea-w-1.jpg",
    alt: "masala chai"
  },
  slug: "spiced milk tea from india",
  description:
    "Masala chai is a delicately balanced tea that highlights the subtle complexities of Indian cuisine.  This creamy brew is perfumed with spicy cinnamon, floral cardamom and fragrant clove and anise that unite in your mouth in an explosion of flavor",
  ingredients: [
    {
      id: 0,
      qty: {
        value: 3,
        label: "g"
      },
      name: {
        display: "ginger"
      },
      type: {
        stored: "dried",
        part: "whole"
      }
    },
    {
      id: 1,
      qty: {
        value: 1.5,
        label: "g"
      },
      name: {
        display: "curled cinnamon"
      },
      type: {
        variety: "curled",
        stored: "dried",
        part: "whole"
      }
    },
    {
      id: 2,
      qty: {
        value: 0.65,
        label: "g"
      },
      name: {
        display: "flat cinnamon"
      },
      type: {
        variety: "flat",
        stored: "dried",
        part: "whole"
      }
    },
    {
      id: 3,
      qty: {
        value: 0.6,
        label: "g"
      },
      name: {
        display: "black pepper"
      },
      type: {
        variety: "black",
        stored: "dried",
        part: "whole"
      }
    },
    {
      id: 4,
      qty: {
        value: 0.15,
        label: "g"
      },
      name: {
        display: "tailed pepper"
      },
      type: {
        variety: "tailed",
        stored: "dried",
        part: "whole"
      }
    },
    {
      id: 5,
      qty: {
        value: 0.15,
        label: "g"
      },
      name: {
        display: "clove"
      },
      type: {
        stored: "dried",
        part: "whole"
      }
    },
    {
      id: 6,
      qty: {
        value: 0.15,
        label: "g"
      },
      name: {
        display: "javentri",
        aliases: ["mace"]
      },
      type: {
        stored: "dried",
        part: "whole"
      }
    },
    {
      id: 7,
      qty: {
        value: 0.3,
        label: "g"
      },
      name: {
        display: "star anise"
      },
      type: {
        stored: "dried",
        part: "whole"
      }
    },
    {
      id: 8,
      qty: {
        value: 1.25,
        label: "g"
      },
      name: {
        display: "green cardamom"
      },
      type: {
        // variety: "green",
        stored: "dried",
        part: "whole"
      }
    },
    {
      id: 9,
      qty: {
        value: 0.5,
        label: "g"
      },
      name: {
        display: "black cardamom"
      },
      type: {
        // variety: "black",
        stored: "dried",
        part: "whole"
      }
    },
    {
      id: 10,
      qty: {
        value: 9.2,
        label: "g",
        aliases: [
          {
            value: 4,
            label: "tea bags"
          }
        ]
      },
      name: {
        display: "tea"
      },
      type: {
        brand: "Tetly",
        type: "black",
        stored: "dried",
        part: "whole"
      }
    },
    {
      id: 11,
      name: {
        display: "sugar"
      },
      qty: {
        value: 40,
        label: "g"
      }
    },
    {
      id: 12,
      name: {
        display: "water"
      },
      qty: {
        value: 350,
        label: "g"
      }
    },
    {
      id: 13,
      qty: {
        value: 350,
        label: "g"
      },
      name: {
        display: "milk"
      },
      type: {
        variety: "whole",
        stored: "fresh"
      }
    }
  ],
  steps: [
    {
      process: "grind",
      ingredients: [0, 1, 2, 3, 4, 5, 6, 7],
      to: `a fine powder`
    },
    {
      process: "grind",
      ingredients: [8, 9]
    },
    {
        process: 'heat',
        ingredients: [12, 13],
        to: 'boiling'
    }
  ]
};

function IngredientsList({ ingredients }) {
  return (
    <Fragment>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map(ing => {
          const { id, qty, name } = ing;
          return (
            <li className={styles.ingredientsListItem} key={id}>
              {qty.value} {qty.label} - {name.display}
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

function StepsList({ steps }) {
  return (
    <Fragment>
      <h2>Steps</h2>
      <ul>
        {steps.map((step, key) => {
          const { process, notes, to } = step;

          let stepText = "";

          if (step.ingredients && !!step.ingredients.length) {
            const ingredients = step.ingredients
              .map(id => recipe.ingredients.filter(ing => ing.id === id)[0])
              .map(ing => ing.name.display);

            switch (ingredients.length) {
              case 0:
                break;
              case 1:
                stepText += ingredients[0];
                break;
              case 2:
                stepText += `${ingredients[0]} and ${ingredients[1]}`;
                break;
              default:
                ingredients.forEach((name, i) => {
                  switch (i) {
                    case ingredients.length - 2:
                      return (stepText += `${name} and `);
                    case ingredients.length - 1:
                      return (stepText += `${name}`);
                    default:
                      return (stepText += `${name}, `);
                  }
                });
            }
          }

          if (!!to) {
            stepText += ` to ${to}`;
          }

          stepText += '.';

          if (!!notes) {

              stepText += ` ${notes}`
          }

          return (
            <li className={styles.stepsListItem} key={key}>
              <span>{process}</span> {stepText}
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

class Recipe extends Component {
  state = {
    activeTab: 0,
    recipe
  };

  handleTabChange = e => {
    console.log(e.target);
  };

  render() {
    const { activeTab } = this.state;
    const { name, slug, ingredients, steps, img } = this.state.recipe;

    return (
      <Fragment>
        <img className={styles.img} src={img.url} alt={img.alt} />
        <div className={styles.container}>
          <h1 className={styles.h1}>{name}</h1>
          <p>{slug}</p>
          <Paper className={styles.paper} elevation={2}>
            <Tabs value={activeTab} onChange={this.handleTabChange}>
              <Tab label="recipe" />
              <Tab label="versions" />
              <Tab label="info" />
            </Tabs>
            {activeTab === 0 && (
              <Fragment>
                {/* <IngredientsList ingredients={ingredients} /> */}
                <StepsList steps={steps} />
              </Fragment>
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
