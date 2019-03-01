import { routerActions } from "connected-react-router";

import { snackbarActions as snackbar } from "../snackbar";

const axios = require("axios");

const API_URL = process.env.API_URL || "https://api-bougie-haus.herokuapp.com";

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
  dispatch(
    routerActions.push("/ingredients/" + ingredient.wiki.titles.canonical)
  );
};

const createIngredientFailure = ({ error, redirect }) => dispatch => {
  dispatch(snackbar.enqueueSnackbar(error));
  dispatch(routerActions.push(redirect));
};

const attemptCreateIngredient = normalized => dispatch => {
  axios({
    url: `${API_URL}/ingredients/new`,
    data: normalized,
    method: 'post',
    headers: {
      'Access-Control-Allow-Origin': 'http://www.bougie.haus'
    }
  }).then(
    res => dispatch(createIngredientSuccess({ ingredient: res.data })),
    error =>
      dispatch(
        createIngredientFailure({
          error,
          redirect: normalized.titles.canonical
        })
      )
  );
};

/**
 *
 * attempt create ingredient thunk set
 * ACT.ingredients.attemptAdd({name, wikipedia, varieties})
 *
 * adds the ingredient and goes back to referer
 *
 */
const editIngredientSuccess = ({ titles }) => dispatch => {
  dispatch(snackbar.enqueueSnackbar(`${titles.display} was edited`));
  dispatch(
    routerActions.push("/ingredients/" + titles.canonical)
  );
};

const editIngredientFailure = ({ error, canonical }) => dispatch => {
  dispatch(snackbar.enqueueSnackbar(error));
  dispatch(
    routerActions.push("/ingredients/" + canonical)
  );
};

const attemptEditIngredient = ({ingredient}) => dispatch => {
  const {canonical, wiki: {titles, extract}} = ingredient;
  axios({
    url: `${API_URL}/ingredients/${canonical}`,
    data: {extract},
    method: 'patch',
    headers: {
      'Access-Control-Allow-Origin': 'http://www.bougie.haus'
    }

  }).then(
    () => dispatch(editIngredientSuccess({titles})),
    error =>
      dispatch(
        editIngredientFailure({
          error,
          canonical
        })
      )
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

const loadIngredientFailure = ({ error }) => dispatch => {
  dispatch(snackbar.enqueueSnackbar(error));
  dispatch(routerActions.push("/ingredients/new"));
};

const loadIngredient = ({ canonical }) => dispatch => {
  axios({
    url: `${API_URL}/ingredients/${canonical}`,
    method: 'get',
    headers: {
      'Access-Control-Allow-Origin': 'http://www.bougie.haus'
    }
  })
    .then(
      result => dispatch(loadIngredientSuccess({ ingredient: result.data })),
      error => dispatch(loadIngredientFailure({ error }))
    );
};

const RESET_INGREDIENT = "RESET_INGREDIENT";
const resetIngredient = () => ({
  type: RESET_INGREDIENT
});

/**
 *
 * load ingredient thunk set
 * ACT.ingredients.loadIngredient({urlName})
 *
 * loads ingredient data from the urlName parameter
 *
 */
const LOAD_ALL_INGREDIENTS_SUCCESS = "LOAD_ALL_INGREDIENTS_SUCCESS";
const loadAllIngredientsSuccess = ({ ingredients }) => dispatch => {
  dispatch(resetAllIngredients());
  dispatch({
    type: LOAD_ALL_INGREDIENTS_SUCCESS,
    ingredients
  });
};

const loadAllIngredientsFailure = ({ error }) => dispatch => {
  dispatch(snackbar.enqueueSnackbar(error));
  // dispatch(routerActions.pop());
};

const loadAllIngredients = () => dispatch => {
  axios({
    url: `${API_URL}/ingredients`,
    headers: {
      'Access-Control-Allow-Origin': 'http://www.bougie.haus'
    }
  })
    .then(
      result =>
        dispatch(loadAllIngredientsSuccess({ ingredients: result.data })),
      error => dispatch(loadAllIngredientsFailure({ error }))
    );
};

const RESET_ALL_INGREDIENTS = "RESET_ALL_INGREDIENTS";
const resetAllIngredients = () => ({
  type: RESET_ALL_INGREDIENTS
});

const deleteIngredient = canonical => dispatch => {
  axios({
    url: `${API_URL}/ingredients/${canonical}`,
    method: 'delete',
    headers: {
      'Access-Control-Allow-Origin': 'http://www.bougie.haus'
    }
  })
    .then(
      result => dispatch(snackbar.enqueueSnackbar(result.data.message)),
      err => dispatch(snackbar.enqueueSnackbar(err))
    )
    .finally(() => dispatch(routerActions.push("/ingredients")));
};

const LOAD_NEW_INGREDIENT_INFO = "LOAD_NEW_INGREDIENT_INFO";
const RESET_NEW_INGREDIENT = "RESET_NEW_INGREDIENT";
const ACTIONS = {
  CREATE_INGREDIENT_SUCCESS,
  LOAD_INGREDIENT_SUCCESS,
  LOAD_NEW_INGREDIENT_INFO,
  RESET_NEW_INGREDIENT,
  RESET_INGREDIENT,
  LOAD_ALL_INGREDIENTS_SUCCESS,
  RESET_ALL_INGREDIENTS
};

const ingredientsActions = {
  attemptCreateIngredient,
  attemptEditIngredient,
  loadIngredient,
  resetIngredient,
  loadAllIngredients,
  resetAllIngredients,
  deleteIngredient
};

export { ACTIONS as INGREDIENTS_ACTIONS, ingredientsActions };
