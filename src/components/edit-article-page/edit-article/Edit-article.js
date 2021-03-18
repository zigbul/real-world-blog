import React, { useState } from 'react';
import styles from './Edit-article.module.scss';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import TagButtonList from './tag-button-list';
import { setID } from '../../../helper';

const EditArticle = ({ singleArticle, articleUpdateFetch, offset }) => {

   const { body, title, slug, description, tagList } = singleArticle;

   const [article, setArticle] = useState({body, title, description})
   const [tags, setTags] = useState(tagList.length === 1 ? createTag() : tagList.map(tag => createTag(tag)));

   function createTag(tag = '') {
      return {
         value: tag,
         id: setID(),
      }
   }

   function addTag(id, value) {
      const newArr = tags.map( tag => {
         if(tag.id === id) {
            return tag = {...tag, value: value};
         }
         return tag;
      })
		setTags([...newArr, createTag()]);
      setArticle({...article, tagList: tags.map(tag => tag.value)});
	}

   function deleteTag(id) {
      const newArr = tags.filter( tag => {
         if (tag.id !== id) {
            return tag;
         }
      })
      if (tags.length === 1) {
         setTags([createTag()]);

      } else {
         setTags(newArr);
      }
      setArticle({...article, tagList: tags.map(tag => tag.value)});
   }

   const handleChange = event => {
      event.preventDefault();
      setArticle({...article, [event.target.name]: event.target.value});
   };

   const onSubmit = () => {
      articleUpdateFetch(article, slug, offset);
   };

   const { register, handleSubmit, errors } = useForm();

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
               value={article.description}
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
            <TagButtonList 
               tags={tags}
               addTag={addTag}
               deleteTag={deleteTag}
            />
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