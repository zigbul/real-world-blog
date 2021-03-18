import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import heart from '../../assets/heart.svg';
import redHeart from '../../assets/redheart.svg';
import styles from './Like.module.scss';

const Like = ({ count, slug, offset, favoriteArticle, unFavoriteArticle }) => {

   const [liked, setLiked] = useState(localStorage.getItem(slug));
   const [likeCount, setLikeCount] = useState(count);

   const onLikeHandler = () => {
      if (localStorage.token) {
         if(liked) {
            setLiked(false);
            setLikeCount(likeCount - 1);
            unFavoriteArticle(slug, offset);
            localStorage.removeItem(slug);
         } else {
            setLiked(true);
            setLikeCount(likeCount + 1);
            favoriteArticle(slug, offset);
            localStorage.setItem(slug, true);
         }
      }
   };

   return (
      <div className={styles.like}>
         <img  
            src={localStorage.getItem(slug) ? redHeart : heart} 
            className={styles["like__image"]} 
            alt="heart"
            onClick={() => onLikeHandler()} 
         />
         <span>{ likeCount }</span>
      </div>
   );
};

const mapStateToProps = ({ offset }) => {
   return {
      offset,
   };
};

export default connect(mapStateToProps, actions)(Like);