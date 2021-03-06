import { compose, combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { connectRouter, routerMiddleware } from "connected-react-router";

import auth from "./auth/auth.reducer";
import recipes from "./recipes/recipes.reducer";
import ingredients from "./ingredients/ingredients.reducer";
import { snackbarReducer as snackbar } from "./snackbar";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
    auth,
    recipes,
    ingredients,
    snackbar
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(history, initialState) {
  return createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
  );
}

export { ACT } from "./actions";
