import React, { useState, useEffect } from 'react';
import styles from './Registration-form.module.scss';
import { Link } from 'react-router-dom';
import { userPostFetch } from '../../redux/actions';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { EMAIL_REG_EXP } from '../../helper';

const RegistrationForm = ({ userPostFetch }) => {

   const [userInfo, setUserInfo] = useState({username: '', email: '', password: '',});
   const [repeatPassword, setRepeatPassword] = useState('');
   const [passCompare, setPassCompare] = useState(null);
   const [checked, setChecked] = useState(false);
   const [disabled, setDisabled] = useState(false);

   const { register, handleSubmit, errors } = useForm();

   useEffect(() => {
      let formChecker = {...userInfo, checked, repeatPassword}
      for (let key in formChecker) {
         if (!formChecker[key]) {
            setDisabled(true);
            return
         }
         setDisabled(false);
      }
   }, [checked, repeatPassword, userInfo]);

   const handleChange = event => {
      if (event.target.name === 'repeatPassword') {
         setRepeatPassword(event.target.value);
      }
      setUserInfo({...userInfo, [event.target.name]: event.target.value});
   };

   const onSubmit = () => {
      if(password !== repeatPassword) {
         setPassCompare(true);
      } else {
         setPassCompare(null);
         userPostFetch(userInfo);
      }
   };

   const { username, email, password, } = userInfo;

   return (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
         <h2 className={styles.form__header}>Create new account</h2>
         <label className={styles["input-wrapper"]}>
            <span className={styles["input-header"]}>Username</span>
            <input 
               className={errors.username && styles["input_red-border"]}
               type="text"
               placeholder="Username"
               name='username'
               value={username}
               onChange={handleChange}
               ref={register({ required: true, maxLength: 20, minLength: 3, })}
            />
            {errors.username && <p className={styles["input-error"]}>Username is required</p>} 
         </label>
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
            <span className={styles["input-header"]}>Password</span>
            <input 
               className={errors.password && styles["input_red-border"]}
               type="password"
               placeholder="Password"
               name='password'
               value={password}
               onChange={handleChange}
               ref={register({ required: true, maxLength: 40, minLength: 8, })}
            />
            {errors.password && <p className={styles["input-error"]}>Your password needs to be at least 8 characters.</p>}
         </label>
         <label className={styles["input-wrapper"]}>
            <span className={styles["input-header"]}>Repeat Password</span>
            <input 
               className={(errors.repeatPassword || passCompare) && styles["input_red-border"]}
               type="password"
               placeholder="Password"
               name='repeatPassword'
               value={repeatPassword}
               onChange={handleChange}
               ref={register({ required: true, })}
            />
            { errors.repeatPassword && <p className={styles["input-error"]}>Repeat password</p> }
            { passCompare && <p className={styles["input-error"]}>Passwords must match</p> }
         </label>
         <label className={styles["checkbox-block"]}>
            <input
               type="checkbox"
               name="checkbox"
               checked={checked}
               onChange={() => setChecked(!checked)}
               ref={register({ required: true, })} 
            />
            <span className={errors.checkbox && styles["span_red-border"]} />
            <p>I agree to the processing of my personal information</p>
            {errors.checkbox && <p className={styles["input-error"]}>You must agree before registration</p>}
         </label>
         <input 
            type="submit"
            className={disabled ? styles.form__button_disabled : styles.form__button} 
            value="Create" 
            disabled={disabled} 
         />
         <div className={styles["link-block"]}>
            <p>Already have an account?</p><Link to="/sign-in" className={styles.link}>Sign In.</Link>
         </div>
      </form>
   );
};

const mapDispatchToProps = dispatch => ({
   userPostFetch: userInfo => dispatch(userPostFetch(userInfo)),
});

export default connect(null, mapDispatchToProps)(RegistrationForm);