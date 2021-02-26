import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

const Header = ({ logoutUser, currentUser, setOffset }) => {

  const { username, avatar } = currentUser;

  const handleClick = event => {
    event.preventDefault()
    // Удаление token из localStorage
    localStorage.removeItem("token")
    // удаление из Redux хранилица
    logoutUser();
  }

  if (currentUser.username) {
    return (
      <header className={styles.header}>
        <Link to="/articles" className={styles.header__name} onClick={() => setOffset(0)}>Realworld Blog</Link>
        <div className={styles["profile-menu"]}>
          <Link to="/new-article" className={styles["create-article-btn"]}>Create article</Link>
          <Link to="/profile/"><p className={styles["profile-name"]}>{username}</p></Link>
          <Link to="/profile/"><img className={styles["avatar-img"]} scr={avatar} alt="avatar" width="46px" height="46px" /></Link>
          <Link to="/sign-in/" className={styles["logout-btn"]} onClick={handleClick}>Log out</Link>
        </div>
    </header>
    )
  } else {
    return (
      <header className={styles.header}>
        <Link to="/articles" className={styles.header__name}>Realworld Blog</Link>
        <div className={styles.panel}>
          <Link to="/sign-in/" className={styles["panel__sign-in-button"]}>Sign In</Link>
          <Link to="/sign-up/" className={styles["panel__sign-up-button"]}>Sign Up</Link>
        </div>
    </header>
    )
  }
};

const mapStateToProps = ({currentUser}) => {
  return {
    currentUser,
  }
}

export default connect(mapStateToProps, actions)(Header);