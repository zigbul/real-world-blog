import * as constant from '../constants.js';
import { token } from '../helper';
import { myBlogService } from '../service';

export const startFetching = () => {
  return { type: constant.START_FETCHING };
};

export const fetchingSuccess = () => {
  return { type: constant.FETCHING_SUCCESS};
};

export const setArticles = (articles) => {
  return { type: constant.SET_ARTICLES, articles };
};

export const setArticlesCount = (articlesCount) => {
  return { type: constant.SET_ARTICLES_COUNT, articlesCount }
}

export const setOffset = (offset) => {
  return { type: constant.SET_OFFSET, offset };
};

export const setPage = (page) => {
  return { type: constant.SET_PAGE, page };
};

export const setSingleArticle = (singleArticle) => {
  return { type: constant.SET_SINGLE_ARTICLE, singleArticle };
};

export const setModal = (boolean) => {
  return { type: constant.SET_MODAL, boolean };
};

export const setValidate = (boolean) => {
  return { type: constant.SET_VALIDATE, boolean };
};

const loginUser = userObj => ({
  type: constant.LOGIN_USER,
  userObj
});

export const logoutUser = () => ({
  type: constant.LOGOUT_USER,
});

export const getArticles = offset => {
  return async (dispatch) => {
    dispatch(startFetching());
    dispatch(setOffset(offset));
    try {
      const res = await myBlogService.getArticles(offset);
      const data = await res.json();
      dispatch(setArticles(data.articles));
      dispatch(setArticlesCount(data.articlesCount));
      return dispatch(fetchingSuccess());
    } catch (e) {
      return console.log(e);
    }
  };
};

export const userPostFetch = user => {
  return async dispatch => {
    const resp = await myBlogService.userPostFetch(user);
    const data = await resp.json();
    if (data.message) {
      alert(data.message);
    } else {
      localStorage.setItem("token", data.user.token);
      dispatch(loginUser(data.user));
    };
  };
};

export const userLoginFetch = user => {
  return dispatch => {
    return myBlogService.userLoginFetch(user)
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem("token", data.user.token);
        dispatch(loginUser(data.user));
    })
      .catch( e => console.log(e));
  };
};

export const getArticleFetch = (slug) => {
  return (dispatch) => {
    dispatch(startFetching());
    return myBlogService.getArticleFetch(slug)
      .then(resp => resp.json())
      .then(data => {
        dispatch(setSingleArticle(data.article));
        dispatch(fetchingSuccess());
    })
      .catch( e => console.log(e));
  };
};

export const getProfileFetch = () => {
  return dispatch => {
    if (token) {
      return myBlogService.getProfileFetch(token)
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
             // Будет ошибка если token не дествительный
            localStorage.clear();
          } else {
            dispatch(loginUser(data.user))
          }
      })
        .catch( e => console.log(e));
    };
  };
};

export const userUpdateFetch = user => {
  return dispatch => {
    dispatch(startFetching());
    dispatch(setValidate(true));
    return myBlogService.userUpdateFetch(token, user)
      .then( res => res.json())
      .then( data => {
        localStorage.setItem("token", data.user.token);
        dispatch(loginUser(data.user));
    })
      .then( () => dispatch(getArticles(0)))
      .then( () => dispatch(setValidate(false)))
      .catch( e => console.log(e));
  };
}; 

export const articlePostFetch = article => {
  return dispatch => {
    dispatch(startFetching());
    dispatch(setValidate(true));
    return myBlogService.articlePostFetch(token, article)
        .then( res => res.json())
        .then( () => dispatch(setOffset(0)))
        .then( () => dispatch(setPage(1)))
        .then( () => dispatch(getArticles(0)))
        .then( () => dispatch(setValidate(false)))
        .catch( e => console.log(e));
  };
};

export const articleUpdateFetch = (article, slug, offset) => {
  return dispatch => {
    dispatch(startFetching());
    dispatch(setValidate(true));
    return myBlogService.articleUpdateFetch(token, article, slug)
      .then( res => res.json())
      .then( () => dispatch(getArticles(offset)))
      .then( () => dispatch(setValidate(false)))
      .catch( e => console.log(e));
  };
};

export const articleDeleteFetch = (slug, offset) => {
  return dispatch => {
    dispatch(startFetching());
    return myBlogService.articleDeleteFetch(token, slug)
        .then(() => dispatch(setModal(false)))
        .then( () => dispatch(getArticles(offset)))
        .catch( e => console.log(e));
  };
};

export const favoriteArticle = (slug) => {
  return () => {
    return myBlogService.favoriteArticle(token, slug)
      .catch( e => console.log(e));
  };
};

export const unFavoriteArticle = (slug) => {
  return () => {
    return myBlogService.unFavoriteArticle(token, slug)
      .catch( e => console.log(e));
  };
};