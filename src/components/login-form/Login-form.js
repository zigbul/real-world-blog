import React, { useState } from 'react';
import styles from './Login-form.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLoginFetch } from '../../redux/actions';
import { useForm } from 'react-hook-form';
import { EMAIL_REG_EXP } from '../../helper';

const LoginForm = ({ userLoginFetch }) => {

   const [user, setUser] = useState({ email: '', password: '' });

   const { register, handleSubmit, errors } = useForm();

   const handleChange = event => {
      setUser({...user, [event.target.name]: event.target.value});
   };

   const onSubmit = () => {
      userLoginFetch(user);
      localStorage.setItem('password', password);
   };

   const {email, password} = user;

   return (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
         <h2 className={styles.form__header}>Sign In</h2>
         <label className={styles["input-wrapper"]}>
            <span className={styles["input-header"]}>Email address</span>
            <input
               className={errors.email && styles["input_red-border"]}  
               type="email"
               placeholder="Email address"
               name='email'
               value={email}
               onChange={handleChange}
               ref={register({ required: true, pattern: EMAIL_REG_EXP })}
            />
            {errors.email && <p className={styles["input-error"]}>Enter valid E-mail address</p>}  
         </label>
         <label className={styles["input-wrapper"]}>
            <span>Password</span>
            <input
               className={errors.password && styles["input_red-border"]} 
               type="password"
               placeholder="Password"
               name='password'
               value={password}
               onChange={handleChange}
               ref={register({ required: true, })}
            />
            {errors.password && <p className={styles["input-error"]}>Enter password</p>}
         </label>
         <input type="submit" className={styles.form__button} value="Login" />
         <div className={styles["link-block"]}>
            <p>Don’t have an account?</p><Link to="/sign-up" className={styles.link}>Sign Up.</Link>
         </div>
      </form>
   );
};

const mapDispatchToProps = dispatch => ({
   userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(LoginForm);