import { RECIPES_ACTIONS as ACTIONS } from "./recipes.actions";

export default function(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_RECIPE_SUCCESS:
      return { ...state, current: { ...action.recipe } };
    case ACTIONS.CREATE_RECIPE_SUCCESS:
      return { ...state, current: { ...action.recipe } };
    case ACTIONS.UPDATE_RECIPE_SUCCESS:
      return { ...state, current: { ...action.recipe } };
    case ACTIONS.DELETE_RECIPE_SUCCESS:
      return { ...state, current: {} };
    default:
      return { ...state };
  }
}
