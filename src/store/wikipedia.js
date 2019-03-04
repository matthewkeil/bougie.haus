import axios from "axios";
import { WIKIPEDIA_URL } from "../helpers";
import { snackbarActions } from "./snackbar";
import { INGREDIENTS_ACTIONS } from "./ingredients/ingredients.actions";

/* =============================================
 *  autocomplete search bar for wikipedeia
 *
 *  #SEARCH_TERM# = text from the autocomplete box
 * =============================================
 * https://en.wikipedia.org/w/api.php?
 * action=query
 * format=json
 * formatversion=2
 * indexpageids
 * prop=info
 * generator=allpages
 * gaplimit=5
 * gapfrom=#SEARCH_TERM#
 * =============================================
 *
 *    interface WikiSearchGenerator {
 *      batchcomplete: boolean;
 *      continue: {
 *        gapcontinue: string,
 *        continue: string
 *      };
 *      query: {
 *        pageids: string[],
 *        pages: Array<{
 *          pageid: number,
 *          ns: number,
 *          title: string,
 *          contentmodel: string;
 *          pagelanguage: string;
 *          pagelanguagehtmlcode: string;
 *          pagelanguagedir: string;
 *          touched: string;
 *          lastrevid:number;
 *          length: number;
 *        }>
 *      };
 *    }
 *
 * =============================================*/
 
 
 /* ====== query all media from wikipedia page
 *
 *  #CANONICAL_TITLE should be used
 *  https://en.wikipedia.org/api/rest_v1/page/media/#CANONICAL_TITLE
 * =============================================
 * 
 *    interface WikipediaMediaQuery {
 *       revision: string;
 *       tid: string;
 *       items: Array<{
 *         section_id: number;
 *         type: string;
 *         showInGallery: boolean;
 *         caption: {
 *           html: string;
 *           text: string;
 *         },
 *         description: {
 *           html: string;
 *           text: string;
 *           lang: string;
 *         },
 *         titles: {
 *           canonical:
 *           normalized:
 *           display:
 *         },
 *         artist: {
 *           html: string;
 *           text: string
 *           name: string;
 *           user_page: string;
 *         },
 *         credit: {
 *           html: string;
 *           text: string;
 *         },
 *         thumbnail: {
 *           source: string;
 *           width: number;
 *           height: number;
 *           mime: string;
 *         },
 *         original: {
 *           source: string;
 *           width: number;
 *           height: number;
 *           mime: string;
 *         },
 *         file_page: string,
 *         license: {
 *           type: string;
 *           code: string;
 *           url: string;
 *         }
 *       }>
 *    }
 * =============================================*/
 
 
 /* ====== query summary info from wikipedia page
 * #CANONICAL_TITLE should be used
 * https://en.wikipedia.org/api/rest_v1/page/summary/#CANONICAL_TITLE
 * =============================================
 *  interface HTMLString extends String {}
 *
 *  interface WikiTitles {
 *    canonical: string;
 *    normalized: string;
 *    display: string;
 *  }
 *
 *  interface WikiContentUrl {
 *    page: HTMLString;
 *    revisions: HTMLString;
 *    edit: HTMLString;
 *    talk: HTMLString;
 *  }
 *
 *  interface WikipediaSummaryQuery {
 *    type: string;
 *    title: string;
 *    displayTitle: string;
 *    namespace: {
 *      id: number;
 *      text: string;
 *    };
 *    wikiBaseItem: string;
 *    titles: WikiTitles;
 *    pageid: number;
 *    lang: string;
 *    dir: string;
 *    revision: string;
 *    tid: string;
 *    timestamp: string;
 *    description: string;
 *    content_urls: {
 *      desktop: WikiContentUrl;
 *      mobile: WikiContentUrl;
 *    };
 *    api_urls: {
 *      summary: HTMLString;
 *      metadata: HTMLString;
 *      references: HTMLString;
 *      media: HTMLString;
 *      edit_html: HTMLString;
 *      talk_page_html: HTMLString;
 *    };
 *    extract: string;
 *    extract_html: HTMLString
 *  }
 * =============================================
 * =============================================
 */

const GET_WIKI_INFO = "GET_WIKI_INFO";

const WIKI_ACTIONS = {
  GET_WIKI_INFO
};

const convertToApiUrl = url => {
  const [_, lang, title] = WIKIPEDIA_URL.exec(url);

  return `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${title}`;
};

const getTitleInfo = url => dispatch => {
  if (WIKIPEDIA_URL.test(url)) {
    axios.get(convertToApiUrl(url)).then(
      res => {
        if (res.data.type === "standard") {
          return dispatch({
            type: INGREDIENTS_ACTIONS.LOAD_NEW_INGREDIENT_INFO,
            info: res.data
          });
        }
        dispatch(snackbarActions.enqueueSnackbar("thats not an ingredient"));
      },
      () => {
        dispatch(snackbarActions.enqueueSnackbar("invalid wikipedia url"));
      }
    );
  }
};

const wikiActions = {
  getTitleInfo
};

export { wikiActions, WIKI_ACTIONS };
