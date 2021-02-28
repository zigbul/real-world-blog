import React, { useState } from 'react';
import styles from './Edit-article.module.scss';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

const EditArticle = ({ singleArticle, articleUpdateFetch, offset }) => {

   const { body, title, slug } = singleArticle;

   const [article, setArticle] = useState({body: body, title: title});

   const { register, handleSubmit, errors } = useForm();

   const handleChange = event => {
      setArticle({...article, [event.target.name]: event.target.value});
   };

   const onSubmit = () => {
      articleUpdateFetch(article, slug, offset);
   };

   return (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
         <h2 className={styles.form__header}>Edit article</h2>
         <label className={styles["input-wrapper"]}>
            <span className={styles["input-header"]}>Title</span>
            <input
               className={errors.title && styles["input_red-border"]} 
               type="text"
               placeholder="Title"
               name="title"
               value={article.title}
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
               value={article.body}
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
               {/* <div className={styles["tag-wrapper"]}>
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
               </div> */}
            </ul>
         </label>
         <input type="submit" className={styles.form__button} value="Send" />
      </form>
   );
};

const mapStateToProps = ({ singleArticle, offset }) => {
   return {
      singleArticle,
      offset,
   };
};

export default connect(mapStateToProps, actions)(EditArticle);