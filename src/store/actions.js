import { routerActions as router } from 'connected-react-router';
import { authActions as auth } from './auth/auth.actions';
import { recipesActions as recipes } from './recipes/recipes.actions';
import { ingredientsActions as ingredients } from './ingredients/ingredients.actions';
import { snackbarActions as snackbar } from './snackbar';




export const ACT = {
    router,
    auth,
    recipes,
    ingredients,
    snackbar
};
