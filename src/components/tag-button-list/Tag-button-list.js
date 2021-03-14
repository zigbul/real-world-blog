import React from 'react';
import TagButton from '../tag-button';
import styles from './Tag-button-list.module.scss';

const TagButtonList = ({ tags, addTag, deleteTag, onValueChange }) => {

   

   const tagList = tags.map( ({id, ...tagData}, index) => {

      return (
         <TagButton 
            key={id}
            id={id}
            data={tagData}
            addTag={addTag}
            deleteTag={() => deleteTag(id)}
            isActive={index === tags.length - 1 ? false : true}
            // onValueChange={(e) => onValueChange(e, id)}
         />
      );
   });

   return (
      <ul className={styles["tag-list"]}>
         {tagList} 
      </ul>
   )
}

export default TagButtonList;