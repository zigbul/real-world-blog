import React from 'react';
import NewArticleForm from '../new-acticle-form';
import { withRouter } from 'react-router-dom';

const NewFormPage = ({ history }) => {
   return (
      <NewArticleForm
         onItemSelected={() => { 
            history.push(`/articles/`);
         }}
      />
   );
};

export default withRouter(NewFormPage);