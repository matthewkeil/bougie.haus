import { routerActions } from "connected-react-router";

import {snackbarActions as snackbar} from '../snackbar';

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
const createIngredientSuccess = ({ ingredient }) => ({
  type: CREATE_INGREDIENT_SUCCESS,
  ingredient
});

const CREATE_INGREDIENT_FAILURE = "CREATE_INGREDIENT_FAILURE";
const createIngredientFailure = ({ error }) => dispatch => {
  console.log()
  dispatch(snackbar.enqueueSnackbar({message: error.response.data.message}));
};

const attemptCreateIngredient = ingredient => dispatch => {
  axios.post(`${API_URL}/ingredients/new`, ingredient)
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
  dispatch(snackbar.enqueueSnackbar({message: error.message}));
};

const loadIngredient = ({ urlName }) => dispatch => {
  axios
    .get(`${API_URL}/ingredients/${urlName}`)
    .then(
      res => dispatch(loadIngredientSuccess({ ingredient: res.data })),
      error => dispatch(loadIngredientFailure({ error }))
    );
};

const ACTIONS = {
  CREATE_INGREDIENT_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  LOAD_INGREDIENT_SUCCESS,
  LOAD_INGREDIENT_FAILURE
};

const ingredientsActions = {
  attemptCreateIngredient,
  loadIngredient
};

export { ACTIONS as INGREDIENTS_ACTIONS, ingredientsActions };
