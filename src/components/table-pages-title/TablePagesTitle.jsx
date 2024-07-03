import React from 'react';

const TablePagesTitle = ({mainTitle, content}) => {
    return (
        <>
        <div className="row mb-2 mx-0">
           <div className="col-12 sales-page-title-wrap pb-2">
              <div className="box-heading d-flex flex-wrap align-items-center">
                 <h2>{mainTitle}</h2>
                 <p className="mb-0">{content}</p>
              </div>
           </div>
        </div>
        </>
    );
};

export default TablePagesTitle;