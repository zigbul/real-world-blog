import React, { useState } from 'react';
import styles from './New-article-form.module.scss';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

const NewArticleForm = ({ articlePostFetch, onItemSelected }) => {

   const [article, setArticle] = useState({});

   const { register, handleSubmit, errors } = useForm();

   const handleChange = event => {
      setArticle({...article, [event.target.name]: event.target.value});
   };

   const onSubmit = () => {
      articlePostFetch(article);
   };

   return (
      <form 
         className={styles.form} 
         onSubmit={handleSubmit(onSubmit)}
      >
         <h2 className={styles.form__header}>Create new article</h2>
         <label className={styles["input-wrapper"]}>
            <span className={styles["input-header"]}>Title</span>
            <input
               className={errors.title && styles["input_red-border"]} 
               type="text"
               placeholder="Title"
               name="title"
               onChange={handleChange}
               ref={register({ required: true, })}
            />
            {errors.title && <p className={styles["input-error"]}>Title is required</p>}   
         </label>
         <label className={styles["input-wrapper"]}>
            <span>Short description</span>
            <input 
               className={errors.description && styles["input_red-border"]}
               type="text"
               placeholder="Description"
               name="description"
               onChange={handleChange}
               ref={register({ required: true, })}
            />
            {errors.description && <p className={styles["input-error"]}>Short description is required</p>}
         </label>
         <label className={styles["input-wrapper"]}>
            <span>Text</span>
            <textarea 
               className={errors.text && styles["input_red-border"]}
               placeholder="Text"
               name="body"
               onChange={handleChange}
               ref={register({ required: true, })}
            />
            {errors.text && <p className={styles["input-error"]}>Write something</p>}
         </label>
         <label className={styles["input-wrapper"]}>
            <span>Tags</span>
            <ul className={styles["tag-list"]}>
               <div className={styles["tag-wrapper"]}>
                  <input 
                     type="text"
                     placeholder="Tag"
                     name="tag"
                  />
                  <button 
                     className={styles["delete-btn"]}
                     type="button" 
                  >
                     DELETE
                  </button>
                  <button
                     className={styles["add-btn"]} 
                     type="button" 
                  >
                     ADD
                  </button>
               </div>
               <div className={styles["tag-wrapper"]}>
                  <input 
                     type="text"
                     placeholder="Tag"
                     name="tag"
                  />
                  <button 
                     className={styles["delete-btn"]}
                     type="button" 
                  >
                     DELETE
                  </button>
                  <button
                     className={styles["add-btn"]} 
                     type="button" 
                  >
                     ADD
                  </button>
               </div>
            </ul>
         </label>
         <input type="submit" className={styles.form__button} value="Send" onClick={onItemSelected} />
      </form>
   );
};

export default connect(null, actions)(NewArticleForm);