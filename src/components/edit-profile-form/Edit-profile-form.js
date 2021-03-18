import React, { useState } from 'react';
import styles from './Edit-profile-form.module.scss';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { useForm } from 'react-hook-form';
import { EMAIL_REG_EXP, AVATAR_REG_EXP } from '../../helper';

const EditProfileForm = ({ currentUser, userUpdateFetch }) => {

   const [userInfo, setUserInfo] = useState(currentUser);
   const [pass, setPass] = useState(localStorage.getItem('password'));

   const { register, handleSubmit, errors } = useForm();

   const handleChange = event => {
      setUserInfo({...userInfo, [event.target.name]: event.target.value});
   };

   const passChange = event => {
      setPass(event.target.value);
   }

   const onSubmit = () => {
      userUpdateFetch(userInfo);
      localStorage.setItem('password', pass);
   };

   const { username, email, } = userInfo;

   return (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
         <h2 className={styles.form__header}>Edit profile</h2>
         <label className={styles["input-wrapper"]}>
            <span className={styles["input-header"]}>Username</span>
            <input
               className={errors.username && styles["input_red-border"]} 
               type="text"
               placeholder={username}
               value={username}
               name="username"
               onChange={handleChange}
               ref={register({ required: true, maxLength: 20, minLength: 3, })}
            />
            {errors.username && <p className={styles["input-error"]}>Username is required</p>}   
         </label>
         <label className={styles["input-wrapper"]}>
            <span>Email address</span>
            <input 
               className={errors.email && styles["input_red-border"]}
               type="email"
               placeholder={email}
               value={email}
               name="email"
               onChange={handleChange}
               ref={register({ required: true, pattern: EMAIL_REG_EXP })}
            />
            {errors.email && <p className={styles["input-error"]}>Enter valid E-mail address</p>}
         </label>
         <label className={styles["input-wrapper"]}>
            <span>New password</span>
            <input 
               className={errors.password && styles["input_red-border"]}
               type="password"
               placeholder="New password"
               value={pass}
               name="password"
               onChange={passChange}
               ref={register({ required: true, maxLength: 40, minLength: 8, })}
            />
            {errors.password && <p className={styles["input-error"]}>Your password needs to be at least 8 characters.</p>}
         </label>
         <label className={styles["input-wrapper"]}>
            <span>Avatar image (url)</span>
            <input
               className={errors.avatar && styles["input_red-border"]} 
               type="url"
               placeholder="Avatar image"
               name="image"
               onChange={handleChange}
               ref={register({ required: true, pattern: AVATAR_REG_EXP })}
            />
            {errors.avatar && <p className={styles["input-error"]}>Avatar url must be correct</p>}
         </label>
         <input type="submit" className={styles.form__button} value="Save" />
      </form>
   );
};

const mapStateToProps = ({ currentUser }) => {
   return {
      currentUser,
   };
};

export default connect(mapStateToProps, actions)(EditProfileForm);