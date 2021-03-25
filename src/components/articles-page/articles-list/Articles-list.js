import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import styles from './Articles-list.module.scss';
import Article from './article';
import { Spin, Space } from 'antd';

const ArticlesList = ({ articles, loading }) => {

   if(loading) {
      return (
         <Space size="middle" className={styles.spiner}>
            <Spin size="large" />
         </Space>
      );
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