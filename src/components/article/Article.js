import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TagList from '../tag-list';
import { format } from 'date-fns';
import styles from './Article.module.scss';
import heart from '../../assets/heart.svg';
import redHeart from '../../assets/redheart.svg';
import defaultAvatar from '../../assets/defaultAvatar.svg';
import * as actions from '../../redux/actions';

const Article = ({ articleData, setSingleArticle }) => {

   const { title, description, author, tagList, createdAt, favoritesCount, slug } = articleData;
   const { image, username } = author;

   return (
      <article className={styles.article}>
         <div className={styles["article__body"]}>
            <header className={styles["article__header"]}>
               <Link 
                  to={`/articles/${slug}`} 
                  className={styles["article__title"]}
                  onClick={() => setSingleArticle(articleData)}
               >
                     { title }
               </Link>
               <div className={styles.like}>
                  <img  src={localStorage.getItem(slug) ? redHeart : heart} className={styles["like__image"]} alt="heart" />
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
            <img src={ image ? image : defaultAvatar } className={styles["autor-block__avatar"]} width="46px" heigh="46px" alt="avatar" />
         </div>
      </article>
   );
};

export default connect(null, actions)(Article);