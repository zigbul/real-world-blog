const reducer = (state = {
   articles: [],
   articlesCount: 0,
   offset: 0,
   page: 1,
   currentUser: {},
   validate: false,
   }, action) => {
      switch(action.type) {
         case "SET_MODAL":
            return state = { ...state, modal: action.boolean }
         case "START_FETCHING":
            return state = { ...state, loading: true };
         case "FETCHING_SUCCESS":
            return state = { ...state, loading: false};
         case "SET_SINGLE_ARTICLE":
            return state = { ...state, singleArticle: action.singleArticle };
         case "SET_ARTICLES":
            return state = { ...state, articles: action.articles };
         case "SET_ARTICLES_COUNT":
            return state = { ...state, articlesCount: action.articlesCount };
         case "SET_OFFSET":
            return state = { ...state, offset: action.offset };
         case "SET_PAGE":
            return state = { ...state, page: action.page };
         case "SET_VALIDATE":
            return state = { ...state, validate: action.boolean };
         case "LOGIN_USER":
            return state = {...state, currentUser: action.userObj};
         case 'LOGOUT_USER':
            return {...state, currentUser: {} };
         default:
            return state;
      };
};

export default reducer;