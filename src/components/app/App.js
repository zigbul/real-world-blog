import React, { useEffect } from 'react';
import styles from './App.module.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Header from '../header';
import ArticlesList from '../articles-list';
import SingleArticle from '../single-article';
import RegistrationForm from '../registration-form';
import LoginForm from '../login-form';
import EditProfileForm from '../edit-profile-form';
import NewArticleForm from '../new-acticle-form/';
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
          <Route path="/articles/" exact component={ArticlesList} />  
          <Route path={`/articles/:${slug}`} exact component={SingleArticle} />
          <Route path={"/new-article/"} exact component={NewArticleForm} />
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
