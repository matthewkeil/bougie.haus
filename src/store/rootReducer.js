import {ACTIONS} from './actions';


function attemptLogin(state, action) {
    const newState = {...state};

    console.log(action.payload);
    
    return newState
}


export default function (state, action) {
    switch(action.type) {
        case ACTIONS.ATTEMPT_LOGIN:
            return attemptLogin(state, action);
        default:
            return {...state}
    }
}