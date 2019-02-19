import {combineReducers, createStore, applyMiddleware} from 'redux';
import { reducer as formReducer } from 'redux-form'

import rootReducer from './rootReducer';


export default function configureStore(initialState) {
    return createStore(
        combineReducers({
            form: formReducer,
            root: rootReducer
        }),
        initialState,
        applyMiddleware()
    );
}