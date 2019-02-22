import {AUTH_ACTIONS} from './auth.actions';


export default function (state, action) {
    switch(action.type) {
        case AUTH_ACTIONS.LOGIN:
            return {...action.user}
        default:
            return {...state}
    }
}