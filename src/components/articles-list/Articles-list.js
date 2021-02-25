import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import styles from './Articles-list.module.scss';
import Article from '../article';

const ArticlesList = ({ articles, articlesCount, setOffset, loading }) => {

   const arrOfArticles = articles.map( ({ slug, ...articleData }) => {
      return (
         <li 
            key={slug} 
            className={styles["article"]}
         >
            <Article articleData={articleData} slug={slug} />
         </li>
      );
   });

   if(loading) {
      return <h1>Loading...</h1>
   }
   
   return (
      <React.Fragment>
         <ul className={styles["articles-list"]}>
            {arrOfArticles}
         </ul>
         <Pagination 
            className={styles.pagination} 
            defaultCurrent={1}
            pageSize={5}
            total={articlesCount}
            showSizeChanger={false}
            onChange={(page) => setOffset((page - 1) * 5)}
         />
      </React.Fragment>   
   );
};

const mapStateToProps = ({ articlesCount, articles }) => {
   return {
      articlesCount,
      articles,
   };
};

export default connect(mapStateToProps, actions)(ArticlesList);