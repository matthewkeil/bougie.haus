import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import { connectedRouter, routerMiddleware } from 'connected-react-router';

import user from './user.reducer';

const rootReducer = (history) => combineReducers({
    router: connectedRouter(history),
    form: formReducer,
    user
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(history, initialState) {
    return createStore(
        rootReducer(history),     
        initialState,
        composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))),
    );
}