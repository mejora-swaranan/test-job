import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import styles from './../assets/scss/custom.module.scss';

const Pagination = ({
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageIndex,
    pageCount,
    pageOptions,
    setPageSize,
    pageSize,
}) => {
  return (
    <div className={styles.pagiNationBar}>
        <button className='px-0' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {<FaAngleDoubleLeft />}
        </button>{' '}
        <button onClick={previousPage} disabled={!canPreviousPage}>
            Previous
        </button>{' '}
        <span>
            Page {' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
        </span>
        <button onClick={nextPage} disabled={!canNextPage}>
            Next
        </button>{' '}
        <button className='ps-0' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {<FaAngleDoubleRight />}
        </button>{' '}
        <span>
            Go to page:{' '}
            <input
                className='text-center'
                type='number'
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(pageNumber);
                }}
                style={{ width: '50px' }}
            />
        </span>{' '}
        &nbsp;
        <span>
            Show &nbsp;
            <select
                className={styles.selectShowStatus}
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}>
                {[10, 25, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        {pageSize}
                    </option>
                ))}
            </select>
        </span>
    </div>
  );
};

export default Pagination;
