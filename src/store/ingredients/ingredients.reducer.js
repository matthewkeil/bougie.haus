import { INGREDIENTS_ACTIONS as ACTIONS } from "./ingredients.actions";

const INIT_NEW_STATE = {
  info: {}
}

const INIT_CURRENT_STATE = {}

const INIT_STATE = { current: INIT_CURRENT_STATE, new: INIT_NEW_STATE, list: [] }

export default function(
state = INIT_STATE,
  action
) {
  switch (action.type) {
    case ACTIONS.LOAD_INGREDIENT_SUCCESS:
      return { ...state, current: { ...action.ingredient } };
    case ACTIONS.LOAD_NEW_INGREDIENT_INFO:
      return { ...state, new: { ...state.new, info: { ...action.info } } };
    case ACTIONS.RESET_NEW_INGREDIENT:
      return { ...state, new: INIT_NEW_STATE }
    case ACTIONS.RESET_INGREDIENT:
      return {...state, current: INIT_CURRENT_STATE}
    default:
      return { ...state };
  }
}
