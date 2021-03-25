import React from 'react';
import styles from './Single-article.module.scss';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import TagList from '../../domain/tag-list';
import Btns from './btns';
import * as actions from '../../redux/actions';
import Like from '../../domain/like';
import { setAvatarURL } from '../../helper';

const SingleArticle = ({ singleArticle, currentUser }) => {

   const { title, description, author, tagList, createdAt, favoritesCount, body, favorited, slug } = singleArticle;
   const { image, username } = author;

   const btnsBlock = (username === currentUser.username) && <Btns slug={slug} />;

   return (
      <article className={styles.article}>
         <div className={styles["article__body"]}>
            <header className={styles["article__header"]}>
               <h2 className={styles["article__title"]}>
                  { title }
               </h2>
               <Like 
                  count={favoritesCount}
                  favorited={favorited}
                  slug={slug}
               />
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
            <img src={ setAvatarURL(image) } className={styles["autor-block__avatar"]} width="46px" heigh="46px" alt="avatar" />
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