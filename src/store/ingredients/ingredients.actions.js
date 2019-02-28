// import { routerActions } from "connected-react-router";

import { snackbarActions as snackbar } from "../snackbar";
import { routerActions } from "connected-react-router";

const axios = require("axios");

const API_URL = process.env.API_URL || "http://localhost:4000";

/**
 *
 * attempt create ingredient thunk set
 * ACT.ingredients.attemptAdd({name, wikipedia, varieties})
 *
 * adds the ingredient and goes back to referer
 *
 */
const CREATE_INGREDIENT_SUCCESS = "CREATE_INGREDIENT_SUCCESS";
const createIngredientSuccess = ({ ingredient }) => dispatch => {
  dispatch({
    type: CREATE_INGREDIENT_SUCCESS,
    ingredient
  });
  dispatch({
    type: RESET_NEW_INGREDIENT
  });
  dispatch(routerActions.push('/ingredients/' + ingredient.wiki.titles.canonical))
};

const CREATE_INGREDIENT_FAILURE = "CREATE_INGREDIENT_FAILURE";
const createIngredientFailure = ({ error }) => dispatch => {
  dispatch(snackbar.enqueueSnackbar(error));
};

const attemptCreateIngredient = normalized => dispatch => {
  console.log(normalized);
  axios
    .post(`${API_URL}/ingredients/new`, normalized)
    .then(
      res => dispatch(createIngredientSuccess({ ingredient: res.data })),
      error => dispatch(createIngredientFailure({ error }))
    );
};

/**
 *
 * load ingredient thunk set
 * ACT.ingredients.loadIngredient({urlName})
 *
 * loads ingredient data from the urlName parameter
 *
 */
const LOAD_INGREDIENT_SUCCESS = "LOAD_INGREDIENT_SUCCESS";
const loadIngredientSuccess = ({ ingredient }) => ({
  type: LOAD_INGREDIENT_SUCCESS,
  ingredient
});

const LOAD_INGREDIENT_FAILURE = "LOAD_INGREDIENT_FAILURE";
const loadIngredientFailure = ({ error }) => dispatch => {
  dispatch(snackbar.enqueueSnackbar({ message: error.message }));
};

const loadIngredient = ({ urlName }) => dispatch => {
  axios
    .get(`${API_URL}/ingredients/${urlName}`)
    .then(
      res => dispatch(loadIngredientSuccess({ ingredient: res.data })),
      error => dispatch(loadIngredientFailure({ error }))
    );
};



const LOAD_NEW_INGREDIENT_INFO = "LOAD_NEW_INGREDIENT_INFO";
const RESET_NEW_INGREDIENT = "RESET_NEW_INGREDIENT";

const ACTIONS = {
  CREATE_INGREDIENT_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  LOAD_INGREDIENT_SUCCESS,
  LOAD_INGREDIENT_FAILURE,
  LOAD_NEW_INGREDIENT_INFO,
  RESET_NEW_INGREDIENT
};

const ingredientsActions = {
  attemptCreateIngredient,
  loadIngredient
};

export { ACTIONS as INGREDIENTS_ACTIONS, ingredientsActions };
