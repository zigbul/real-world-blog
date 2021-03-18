import React from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';

const PageNumbers = ({ articlesCount, setOffset, setPage, page }) => {

   return (
      <Pagination
         current={page}
         pageSize={5}
         total={articlesCount}
         showSizeChanger={false}
         onChange={(page) => {
            setOffset((page - 1) * 5);
            setPage(page);
         }}
      />
   );
};

const mapStateToProps = ({ articlesCount, offset, page }) => {
   return {
      articlesCount,
      offset,
      page,
   };
};

export default connect(mapStateToProps, actions)(PageNumbers);