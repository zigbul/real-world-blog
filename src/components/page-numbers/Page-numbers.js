import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

const PageNumbers = ({ articlesCount, setOffset, offset }) => {

   const [page, setPage] = useState(1);

   useEffect(() => {
      if(offset === 0) {
         setPage(1)
      }
   }, [offset]);

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

const mapStateToProps = ({ articlesCount, offset }) => {
   return {
      articlesCount,
      offset,
   };
};

export default connect(mapStateToProps, actions)(PageNumbers);