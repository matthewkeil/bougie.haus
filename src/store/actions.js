import { routerActions as router } from 'connected-react-router';
import { authActions as auth } from './auth/auth.actions';
import { recipesActions as recipes } from './recipes/recipes.actions';

export const ACT = {
    router,
    auth,
    recipes
};
