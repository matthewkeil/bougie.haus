const LOAD_RECIPE_SUCCESS = "LOAD_RECIPE_SUCCESS";

const ACTIONS = {
  LOAD_RECIPE_SUCCESS
};

const loadRecipeSuccess = recipe => ({
  type: LOAD_RECIPE_SUCCESS,
  recipe
});

const loadRecipe = id => dispatch => {
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
        until: `it is a fine powder`
      },
      {
        process: "grind",
        ingredients: [8, 9]
      },
      {
        process: "heat",
        ingredients: [12, 13],
        until: "it comes to a boil"
      }
    ]
  };

  setTimeout(() => dispatch(loadRecipeSuccess(recipe)), 200);
};

const recipesActions = {
    loadRecipe
};

export { ACTIONS as RECIPES_ACTIONS, recipesActions };
