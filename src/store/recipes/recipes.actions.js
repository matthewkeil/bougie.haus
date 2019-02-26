import { routerActions } from "connected-react-router";

const axios = require("axios");

const API_URL = process.env.API_URL || "http://localhost:4000";

/**
 *
 * load recipe thunk set
 * ACT.recipes.loadRecipe({urlName})
 *
 * loads recipe data from the urlName parameter
 *
 */
const LOAD_ALL_RECIPES_SUCCESS = "LOAD_ALL_RECIPES_SUCCESS";
const loadAllRecipeSuccess = ({ recipes }) => ({
  type: LOAD_ALL_RECIPES_SUCCESS,
  recipes
});

const LOAD_ALL_RECIPES_FAILURE = "LOAD_ALL_RECIPES_FAILURE";
const loadAllRecipeFailure = ({ error }) => ({
  type: LOAD_ALL_RECIPES_FAILURE,
  error
});

const loadAllRecipes = () => dispatch => {
  axios
    .get(`${API_URL}/recipes`)
    .then(
      res => dispatch(loadAllRecipeSuccess({ recipes: res.data })),
      error => dispatch(loadAllRecipeFailure({ error }))
    );
};

/**
 *
 * load recipe thunk set
 * ACT.recipes.loadRecipe({urlName})
 *
 * loads recipe data from the urlName parameter
 *
 */
const LOAD_RECIPE_SUCCESS = "LOAD_RECIPE_SUCCESS";
const loadRecipeSuccess = ({ recipe }) => ({
  type: LOAD_RECIPE_SUCCESS,
  recipe
});

const LOAD_RECIPE_FAILURE = "LOAD_RECIPE_FAILURE";
const loadRecipeFailure = ({ error }) => ({
  type: LOAD_RECIPE_FAILURE,
  error
});

const loadRecipe = ({ urlName }) => dispatch => {
  axios
    .get(`${API_URL}/recipes/${urlName}`)
    .then(
      res => dispatch(loadRecipeSuccess({ recipe: res.data })),
      error => dispatch(loadRecipeFailure({ error }))
    );
};

/**
 *
 * create recipe thunk set
 * ACT.recipes.create({recipe})
 *
 * creates a new receipe and redirects to the view
 *
 */
const CREATE_RECIPE_SUCCESS = "CREATE_RECIPE_SUCCESS";
const createRecipeSuccess = ({ recipe }) => dispatch => {
  dispatch({
    type: CREATE_RECIPE_SUCCESS,
    recipe
  });
  dispatch(routerActions.go(`/recipes/${recipe.urlName}`));
};

const CREATE_RECIPE_FAILURE = "CREATE_RECIPE_FAILURE";
const createRecipeFailure = ({ error }) => ({
  type: CREATE_RECIPE_FAILURE,
  error
});

const createRecipe = ({ recipe }) => dispatch => {
  console.log(recipe)
  axios({
    url: `${API_URL}/recipes/new`,
    method: "post",
    data: recipe
  }).then(
    res => dispatch(createRecipeSuccess({ recipe: res.data })),
    error => dispatch(createRecipeFailure({ error }))
  );
};

/**
 *
 * update recipe thunk set
 * ACT.recipes.update({urlName, data})
 *
 * updates a set of parameter on an existing recipe
 *
 */
const UPDATE_RECIPE_SUCCESS = "UPDATE_RECIPE_SUCCESS";
const updateRecipeSuccess = ({ recipe }) => ({
  type: UPDATE_RECIPE_SUCCESS,
  recipe
});

const UPDATE_RECIPE_FAILURE = "UPDATE_RECIPE_FAILURE";
const updateRecipeFailure = ({ error }) => ({
  type: UPDATE_RECIPE_FAILURE,
  error
});

const updateRecipe = ({ urlName, data }) => dispatch => {
  axios({
    baseUrl: API_URL,
    url: `/recipes/${urlName}`,
    method: "patch",
    data: data
  }).then(
    res => dispatch(updateRecipeSuccess({ recipe: res.data })),
    error => dispatch(updateRecipeFailure({ error }))
  );
};

/**
 *
 * update recipe thunk set
 * ACT.recipes.update({urlName, data})
 *
 * updates a set of parameter on an existing recipe
 *
 */
const DELETE_RECIPE_SUCCESS = "DELETE_RECIPE_SUCCESS";
const deleteRecipeSuccess = ({ res }) => dispatch => {
  dispatch({
    type: DELETE_RECIPE_SUCCESS
  });
  dispatch(routerActions.push("/recipes"));
};

const DELETE_RECIPE_FAILURE = "DELETE_RECIPE_FAILURE";
const deleteRecipeFailure = ({ error }) => ({
  type: DELETE_RECIPE_FAILURE,
  error
});

const deleteRecipe = ({ urlName }) => dispatch => {
  axios({
    baseUrl: API_URL,
    url: `/recipes/${urlName}`,
    method: "delete"
  }).then(
    res => dispatch(deleteRecipeSuccess({ res })),
    error => dispatch(deleteRecipeFailure({ error }))
  );
};

const ACTIONS = {
  LOAD_RECIPE_SUCCESS,
  LOAD_RECIPE_FAILURE,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE,
  UPDATE_RECIPE_SUCCESS,
  UPDATE_RECIPE_FAILURE,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE
};

const recipesActions = {
  loadAllRecipes,
  loadRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
};

export { ACTIONS as RECIPES_ACTIONS, recipesActions };
