import React from 'react';
import ArticlesList from '../articles-list';
import PageNumbers from '../page-numbers/Page-numbers';
import { withRouter } from 'react-router-dom';

const ArticlesPage = ({ history }) => {
   
   return (
      <React.Fragment>
         <ArticlesList 
            onItemSelected={(itemId) => {
               history.push(`/articles/${itemId}`);
            }}
         />
         <PageNumbers />
      </React.Fragment> 
   );
};

export default withRouter(ArticlesPage);