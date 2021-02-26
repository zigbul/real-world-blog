import React from 'react';
import styles from './Deletion-modal.module.scss';
import vector from '../../assets/vector.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions';

const DeletionModal = ({ setModal, articleDeleteFetch, slug }) => {

   const clickHandler = () => {
      setModal(false);
   };

   return (
      <div className={styles.modal}>
         <div className={styles["modal__body"]}>
            <div className={styles["modal__body-wrapper"]}>
               <img className={styles["modal__body-image"]} src={vector} alt="vector" />
               <p className={styles["modal__text"]}>Are you sure to delete this article?</p>
            </div>
            <div className={styles["modal__btns-block"]}>
               <button className={styles["modal__button"]} onClick={clickHandler}>
                  No
               </button>
               <Link to='/articles/'>
                  <button
                     className={styles["modal__button_blue"]}
                     onClick={() => articleDeleteFetch(slug)}
                  >
                     Yes
                  </button>
               </Link>
               
            </div>
         </div>
      </div>
   );
};

const mapStateToProps = ({ slug }) => {
   return {
      slug,
   }
}

export default connect(mapStateToProps, actions)(DeletionModal);