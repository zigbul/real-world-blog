import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import styles from './Articles-list.module.scss';
import Article from './article';

const ArticlesList = ({ articles, loading }) => {

   if(loading) {
      return <h1>Loading...</h1>
   }

   const arrOfArticles = articles.map( (articleData) => {
      return (
         <li 
            key={articleData.slug} 
            className={styles["article"]}
         >
            <Article 
               articleData={articleData}  
            />
         </li>
      );
   });
   
   return (
      <ul className={styles["articles-list"]}>
         {arrOfArticles}
      </ul>  
   );
};

const mapStateToProps = ({ articles, loading }) => {
   return {
      articles,
      loading,
   };
};

export default connect(mapStateToProps)(ArticlesList);