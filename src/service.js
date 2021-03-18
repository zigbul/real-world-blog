import { API_BASE_URL } from './constants';

class BlogService {

   getArticles(offset) {
      return fetch(`${API_BASE_URL}/articles?limit=5&offset=${offset}`);
   };

   userPostFetch(user) {
      return fetch(`${API_BASE_URL}/users`, {
         method: "POST",
         headers: {
             'Content-Type': 'application/json; charset=utf-8',
         },
         body: JSON.stringify({ user }),
      });
   }

   userLoginFetch(user) {
      return fetch(`${API_BASE_URL}/users/login`, {
         method: "POST",
         headers: {
           'Content-Type': 'application/json; charset=utf-8',
         },
         body: JSON.stringify({user}),
       });
   }

   getArticleFetch(slug) {
      return fetch(`${API_BASE_URL}/articles/${slug}`, {
         method: "GET",
         headers: {
           'Content-Type': 'application/json; charset=utf-8',
         }
      });
   }

   getProfileFetch(token) {
      return fetch(`${API_BASE_URL}/user`, {
         method: "GET",
         headers: {
           'Content-Type': 'application/json; charset=utf-8',
           'Authorization': `Token ${token}`
         }
      });
   }

   userUpdateFetch(token, user) {
      return fetch(`${API_BASE_URL}/user`, {
         method: "PUT",
         headers: {
             'Content-Type': 'application/json; charset=utf-8',
             'Authorization': `Token ${token}`,
         },
         body: JSON.stringify({ user })
      });
   }

   articlePostFetch(token, article) {
      return fetch(`${API_BASE_URL}/articles`, {
         method: "POST",
         headers: {
             'Content-Type': 'application/json; charset=utf-8',
             'Authorization': `Token ${token}`,
         },
         body: JSON.stringify({ article }),
      });
   }

   articleUpdateFetch(token, article, slug) {
      return fetch(`${API_BASE_URL}/articles/${slug}`, {
         method: "PUT",
         headers: {
             'Content-Type': 'application/json; charset=utf-8',
             'Authorization': `Token ${token}`,
         },
         body: JSON.stringify({ article })
      });
   }

   articleDeleteFetch(token, slug) {
      return fetch(`${API_BASE_URL}/articles/${slug}`, {
         method: "DELETE",
           headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'Authorization': `Token ${token}`,
           },
      });
   }

   favoriteArticle(token, slug) {
      return fetch(`${API_BASE_URL}/articles/${slug}/favorite`, {
         method: "POST",
           headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'Authorization': `Token ${token}`,
           },
      });
   }

   unFavoriteArticle(token, slug) {
      return fetch(`${API_BASE_URL}/articles/${slug}/favorite`, {
         method: "DELETE",
           headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'Authorization': `Token ${token}`,
           },
      });
   }
}

export const myBlogService = new BlogService(); 