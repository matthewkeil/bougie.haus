import { INGREDIENTS_ACTIONS as ACTIONS } from "./ingredients.actions";

export default function(state = {current: null, ingredients: []}, action) {
  switch (action.type) {
    case ACTIONS.LOAD_INGREDIENT_SUCCESS:
      return { ...state, current: { ...action.ingredient } };
    default:
      return { ...state };
  }
}
