import * as constant from '../constants';

const reducer = (state = {
   articles: [],
   articlesCount: 0,
   offset: 0,
   page: 1,
   currentUser: {},
   validate: false,
   }, action) => {
      switch(action.type) {
         case constant.SET_MODAL:
            return state = { ...state, modal: action.boolean }
         case constant.START_FETCHING:
            return state = { ...state, loading: true };
         case constant.FETCHING_SUCCESS:
            return state = { ...state, loading: false};
         case constant.SET_SINGLE_ARTICLE:
            return state = { ...state, singleArticle: action.singleArticle };
         case constant.SET_ARTICLES:
            return state = { ...state, articles: action.articles };
         case constant.SET_ARTICLES_COUNT:
            return state = { ...state, articlesCount: action.articlesCount };
         case constant.SET_OFFSET:
            return state = { ...state, offset: action.offset };
         case constant.SET_PAGE:
            return state = { ...state, page: action.page };
         case constant.SET_VALIDATE:
            return state = { ...state, validate: action.boolean };
         case constant.LOGIN_USER:
            return state = {...state, currentUser: action.userObj};
         case constant.LOGOUT_USER:
            return {...state, currentUser: {} };
         default:
            return state;
      };
};

export default reducer;