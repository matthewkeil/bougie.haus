import {USER_ACTIONS as ACTIONS} from './user.actions';


function attemptLogin(state, action) {
    const {email, password} = action;

    console.log(email, password)
    return {...state}//, user: {email, password}}
}


export default function (state, action) {
    switch(action.type) {
        case ACTIONS.ATTEMPT_LOGIN:
            return attemptLogin(state, action);
        default:
            return {...state}
    }
}