import React from 'react';
import styles from './Tag-list.module.scss';
import { setID } from '../../helper';

const TagList = ({ tagList }) => {

   const tags = tagList.map( tag => {
      return (
         <li key={setID()} className={styles["tag-list__item"]}>
            <span className={styles["tag"]}>{ tag }</span>
         </li>
      );
   });

   return (
      <ul className={styles["tag-list"]}>
         { tags }
      </ul>
   );
};

export default TagList;