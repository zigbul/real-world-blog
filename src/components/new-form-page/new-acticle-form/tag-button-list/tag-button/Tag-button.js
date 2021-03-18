import React, { useState } from 'react';
import styles from './Tag-button.module.scss';

const TagButton = ({ isActive, addTag, deleteTag, data, id }) => {

   const [value, setValue] = useState(data.value); 

   const addButton = isActive ?  null :  <button
                                             className={styles["add-btn"]} 
                                             type="button"
                                             onClick={() => addTag(id, value)} 
                                          >
                                             ADD
                                          </button> 

   return (
      <div className={styles["tag-wrapper"]}>
         <input 
            type="text"
            placeholder="Tag"
            name="tag"
            disabled={isActive}
            onChange={(e) => setValue(e.target.value)}
            value={value}
         />
         <button 
            className={styles["delete-btn"]}
            type="button"
            onClick={deleteTag} 
         >
            DELETE
         </button>
         {addButton}
      </div>
   );
};

export default TagButton;