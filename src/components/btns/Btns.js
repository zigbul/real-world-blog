import React from 'react';
import styles from './btns.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DeletionModal from '../deletion-modal';
import * as actions from '../../redux/actions';

const Btns = ({ slug, setModal, modal }) => {

   const clickHandler = () => {
      setModal(true);
   }

   return (
      <div className={styles.btns}>
         <button 
            className={styles["delete-btn"]}
            type="button"
            onClick={clickHandler}
         >
            Delete
         </button>
         {modal ? <DeletionModal /> : null}
         <Link to={`/articles/${slug}/edit`} className={styles["edit-btn"]}>
            Edit
         </Link>
      </div>
   );
};

const mapStateToProps = ({ slug, modal }) => {
   return {
      slug,
      modal,
   };
};

export default connect(mapStateToProps, actions)(Btns);