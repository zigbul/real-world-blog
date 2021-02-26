export const startFetching = () => {
  return { type: "START_FETCHING" };
};

export const fetchingSuccess = () => {
  return { type: "FETCHING_SUCCESS"};
};

export const setArticles = (articles) => {
  return { type: "SET_ARTICLES", articles };
};

export const setArticlesCount = (articlesCount) => {
  return { type: "SET_ARTICLES_COUNT", articlesCount }
}

export const setOffset = (offset) => {
  return { type: "SET_OFFSET", offset };
};

export const setSlug = (slug) => {
  return { type: "SET_SLUG", slug };
};

export const setSingleArticle = (singleArticle) => {
  return { type: "SET_SINGLE_ARTICLE", singleArticle };
};

export const setModal = (boolean) => {
  return { type: "SET_MODAL", boolean };
};

export const getArticles = (offset) => {
  return (dispatch) => {
    dispatch(startFetching());

    fetch(`https://conduit.productionready.io/api/articles?limit=5&offset=${offset}`)
      .then( res => res.json())
      .then( data => {
        dispatch(setArticles(data.articles));
        dispatch(setArticlesCount(data.articlesCount));
        dispatch(fetchingSuccess());
      })
      .catch( e => console.log(e));
  };
};

export const userPostFetch = user => {
  return async dispatch => {
    const resp = await fetch("https://conduit.productionready.io/api/users", {
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
  type: 'LOGIN_USER',
  userObj
});

export const userLoginFetch = user => {
  return dispatch => {
    return fetch("https://conduit.productionready.io/api/users/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({user})
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
        } else {
          localStorage.setItem("token", data.user.token)
          dispatch(loginUser(data.user))
        }
      })
      .catch( e => console.log(e));
  };
};

export const getArticleFetch = (slug) => {
  return (dispatch) => {
    dispatch(startFetching());
    dispatch(setSlug(slug));
    return fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
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
      return fetch("https://conduit.productionready.io/api/user", {
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
            localStorage.removeItem("token")
          } else {
            dispatch(loginUser(data.user))
          }
        })
        .catch( e => console.log(e));
    };
  };
};

export const userUpdateFetch = user => {
  return async dispatch => {
    const token = localStorage.token;
    const resp = await fetch("https://conduit.productionready.io/api/user", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Token ${token}`,
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

export const articlePostFetch = article => {
  return async dispatch => {
    const token = localStorage.token;
    return fetch("https://conduit.productionready.io/api/articles", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ article })
      })
      .then( res => res.json())
      .then( data => dispatch(setSlug(data.article.slug)))
      .then( () => dispatch(getArticles(0)))
      .catch( e => console.log(e));
  };
};

export const articleUpdateFetch = (article, slug) => {
  return async dispatch => {
    const token = localStorage.token;
    const resp = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ article })
      });
      const data = await resp.json();
      if (data.message) {
        alert(data.message);
      } else {
        console.log(data);
        dispatch(setSlug(data.article.slug));
      };
  };
};

export const articleDeleteFetch = (slug) => {
  return dispatch => {
    dispatch(startFetching());
    const token = localStorage.token;
    return fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
      method: "DELETE",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Token ${token}`,
        },
    })
    .then(() => dispatch(setModal(false)))
    .then( () => dispatch(getArticles(0)))
    .catch( e => console.log(e));
  }
}

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
});