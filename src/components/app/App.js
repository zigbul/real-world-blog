import React, { useEffect } from 'react';
import styles from './App.module.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Header from '../header';
import ArticlesPage from '../articles-page';
import SingleArticle from '../single-article';
import RegistrationForm from '../registration-form';
import LoginForm from '../login-form';
import EditProfileForm from '../edit-profile-form';
import NewFormPage from '../new-form-page/';
import EditArticle from '../edit-article/';

const App = ({ getArticles, slug, offset, getProfileFetch }) => {

  useEffect(() => {
    getProfileFetch();
  }, [getProfileFetch]);

  useEffect(() => {
    getArticles(offset);
  }, [getArticles, offset]);

  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <main className={styles["main-body"]}>
          <Route path="/sign-up/" exact component={RegistrationForm} />
          <Route path="/sign-in/" exact component={LoginForm} />
          <Route path="/profile/" exact component={EditProfileForm} />
          <Route path="/articles/" 
                 exact 
                 render={() => {
                   return <ArticlesPage />
                 }}
           />  
          <Route path={`/articles/:slug`}
                 exact 
                 render={({ match }) => {
                   const { id } = match.params;
                   return <SingleArticle itemId={id} />
                 }} 
          />
          <Route path={"/new-article/"} exact component={NewFormPage} />
          <Route path={`/articles/${slug}/edit`} exact component={EditArticle} />
        </main>
      </div>
    </Router>
  );
};

const mapStateToProps = ({ slug, offset }) => {
  return {
    slug,
    offset,
  };
};

export default connect(mapStateToProps, actions)(App);
