import React from 'react';
import EditArticle from '../edit-article';
import { withRouter } from 'react-router-dom';

const EditArticlePage = ({ history }) => {
   return (
      <EditArticle 
         onItemSelected={(itemId) => {
            history.push(`/articles/${itemId}`);
         }}
      />
   );
};

export default withRouter(EditArticlePage);