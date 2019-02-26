import { routerActions } from "connected-react-router";

import {snackbarActions as snackbar} from '../snackbar';

const axios = require("axios");

const API_URL = process.env.API_URL || "http://localhost:4000";

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
  LOAD_INGREDIENT_SUCCESS,
  LOAD_INGREDIENT_FAILURE
};

const ingredientsActions = {
  loadIngredient
};

export { ACTIONS as INGREDIENTS_ACTIONS, ingredientsActions };
