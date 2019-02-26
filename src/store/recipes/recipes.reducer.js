import {RECIPES_ACTIONS as ACTIONS} from './recipes.actions';


export default function (state, action) {
    switch(action.type) {
        case ACTIONS.LOAD_RECIPE_SUCCESS:
            return {...state, current: {...action.recipe}}
        default:
            return {...state}
    }
}