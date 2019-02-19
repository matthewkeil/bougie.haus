import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk';

import user from './user.reducer';

const rootReducer = combineReducers({
    form: formReducer,
    user
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
    return createStore(
        rootReducer,     
        initialState,
        composeEnhancers(applyMiddleware(thunk)),
    );
}