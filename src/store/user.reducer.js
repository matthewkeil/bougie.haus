import {USER_ACTIONS as ACTIONS} from './user.actions';


export default function (state, action) {
    switch(action.type) {
        case ACTIONS.LOGIN:
            return {...action.user}
        default:
            return {...state}
    }
}