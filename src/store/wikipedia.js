import axios from 'axios';
import {WIKIPEDIA_URL} from '../helpers';
import {snackbarActions} from './snackbar'
import { INGREDIENTS_ACTIONS } from './ingredients/ingredients.actions';

const GET_WIKI_INFO = "GET_WIKI_INFO";

const WIKI_ACTIONS = {
  GET_WIKI_INFO
};

const convertToApiUrl = url => {
    const {groups: {lang, title}} = WIKIPEDIA_URL.exec(url);
    return `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${title}`
}

const getTitleInfo = url => dispatch => {
    if (WIKIPEDIA_URL.test(url)) {
        axios.get(convertToApiUrl(url)).then(
            res => dispatch({
                type: INGREDIENTS_ACTIONS.LOAD_NEW_INGREDIENT_INFO,
                info: res.data
            }),
            () => {
                dispatch(snackbarActions.enqueueSnackbar('invalid wikipedia url'))
            }
        )
    }
};


const wikiActions = {
    getTitleInfo,
};

export { wikiActions, WIKI_ACTIONS };
