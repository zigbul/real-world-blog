import React, { useEffect } from 'react';
import styles from './Single-article.module.scss';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import TagList from '../tag-list';
import Btns from '../btns';
import heart from '../../assets/heart.svg';
import * as actions from '../../redux/actions';

const SingleArticle = ({ singleArticle, loading, currentUser }) => {

   if(loading) {
      return <h1>Loading...</h1>
   }

   const { title, description, author, tagList, createdAt, favoritesCount, body } = singleArticle;
   const { image, username } = author;

   const btnsBlock = (username === currentUser.username) ? <Btns /> : null;

   return (
      <article className={styles.article}>
         <div className={styles["article__body"]}>
            <header className={styles["article__header"]}>
               <h2 className={styles["article__title"]}>
                  { title }
               </h2>
               <div className={styles.like}>
                  <img  src={heart} className={styles["like__image"]} alt="heart" />
                  <span>{ favoritesCount }</span>
               </div>
            </header>
            <TagList tagList={tagList} />
            <p className={styles["article__description"]}>
               { description }
            </p>
         </div>
         <div className={styles["autor-block"]}>
            <div className={styles["autor-block__body"]}>
               <span className={styles["autor-block__name"]}>{ username }</span>
               <span className={styles["autor-block__date"]}>{ format(new Date(createdAt), "PP") }</span>
            </div>
            <img src={ image } className={styles["autor-block__avatar"]} width="46px" heigh="46px" alt="avatar" />
            { btnsBlock }
         </div>
         <p className={styles.article__text}>{ body }</p>
      </article>
   );
};

const mapStateToProps = ({ singleArticle, loading, currentUser }) => {
   return {
      singleArticle,
      loading,
      currentUser,
   };
};

export default connect(mapStateToProps, actions)(SingleArticle);