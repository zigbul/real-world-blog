import React, { useEffect } from 'react';
import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Header from '../header';
import ArticlesPage from '../articles-page';
import SingleArticle from '../single-article';
import RegistrationForm from '../registration-form';
import LoginForm from '../login-form';
import EditProfileForm from '../edit-profile-form';
import NewFormPage from '../new-form-page/';
import EditArticle from '../edit-article-page/edit-article/';

const App = ({ getArticles, offset, getProfileFetch, validate, currentUser }) => {

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
          <Route 
            path="/"
            render={() => (
              currentUser.username ? <Redirect to="/articles" /> : <Redirect to="/sign-in" />
            )}
          >
          </Route>
          <Route path="/sign-up/" exact component={RegistrationForm} />
          <Route path="/sign-in/" exact component={LoginForm} />
          <Route path="/profile/" 
            exact
            render={() => (
              validate ? <Redirect to="/articles"/> : <EditProfileForm />
            )}  
          />
          <Route path="/articles/" exact component={ArticlesPage} />  
          <Route 
            path={`/articles/:slug`}
            exact 
            render={({ match }) => {
              const { id } = match.params;
              return <SingleArticle itemId={id} />
            }} 
          />
          <Route 
            path={"/new-article/"} 
            exact
            render={() => (
              validate ? <Redirect to="/articles"/> : <NewFormPage />
            )}  
          />
          <Route 
            path={`/articles/:slug/edit`}
            exact
            render={({ match }) => {
              const { id } = match.params;
              return validate ? <Redirect to="/articles"/> : <EditArticle item={id} />
            }} 
          />
        </main>
      </div>
    </Router>
  );
};

const mapStateToProps = ({ offset, validate, currentUser }) => {
  return {
    offset,
    validate,
    currentUser,
  };
};

export default connect(mapStateToProps, actions)(App);
