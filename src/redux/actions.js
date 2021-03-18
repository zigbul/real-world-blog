import * as constant from '../constants';

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

export const getArticles = (offset) => {
  return async (dispatch) => {
    dispatch(startFetching());
    dispatch(setOffset(offset));
    try {
      const res = await fetch(`${constant.API_BASE_URL}/articles?limit=5&offset=${offset}`);
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
    const resp = await fetch(`${constant.API_BASE_URL}/users`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ user })
      });
      const data = await resp.json();
      if (data.message) {
        alert(data.message);
      } else {
        console.log(data);
        localStorage.setItem("token", data.user.token);
        dispatch(loginUser(data.user));
      };
  };
};

const loginUser = userObj => ({
  type: constant.LOGIN_USER,
  userObj
});

export const userLoginFetch = user => {
  return dispatch => {
    return fetch(`${constant.API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({user})
    })
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
    // dispatch(setSlug(slug));
    return fetch(`${constant.API_BASE_URL}/articles/${slug}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    })
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
    const token = localStorage.token;
    if (token) {
      return fetch(`${constant.API_BASE_URL}/user`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Token ${token}`
        }
      })
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
    const token = localStorage.token;
    return fetch(`${constant.API_BASE_URL}/user`, {
      method: "PUT",
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({ user })
    })
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
    const token = localStorage.token;
    return fetch(`${constant.API_BASE_URL}/articles`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ article })
      })
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
    const token = localStorage.token;
    return fetch(`${constant.API_BASE_URL}/articles/${slug}`, {
      method: "PUT",
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({ article })
    })
      .then( res => res.json())
      .then( () => dispatch(getArticles(offset)))
      .then( () => dispatch(setValidate(false)))
      .catch( e => console.log(e));
  };
};

export const articleDeleteFetch = (slug, offset) => {
  return dispatch => {
    dispatch(startFetching());
    const token = localStorage.token;
    return fetch(`${constant.API_BASE_URL}/articles/${slug}`, {
      method: "DELETE",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Token ${token}`,
        },
    })
        .then(() => dispatch(setModal(false)))
        .then( () => dispatch(getArticles(offset)))
        .catch( e => console.log(e));
  };
};

export const favoriteArticle = (slug, offset) => {
  return dispatch => {
    const token = localStorage.token;
    return fetch(`${constant.API_BASE_URL}/articles/${slug}/favorite`, {
      method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Token ${token}`,
        },
    })
      .then( res => res.json())
      .then( data => {
        dispatch(articleUpdateFetch(data, slug, offset));
      })
      .catch( e => console.log(e));
  };
};

export const unFavoriteArticle = (slug, offset) => {
  return dispatch => {
    const token = localStorage.token;
    return fetch(`${constant.API_BASE_URL}/articles/${slug}/favorite`, {
      method: "DELETE",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Token ${token}`,
        },
    })
      .then( res => res.json())
      .then( data => dispatch(articleUpdateFetch(data, slug, offset)))
      .catch( e => console.log(e));
  };
};

export const logoutUser = () => ({
  type: constant.LOGOUT_USER,
});