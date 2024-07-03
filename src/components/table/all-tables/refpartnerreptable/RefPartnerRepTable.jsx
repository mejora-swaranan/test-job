import React, { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { Link } from 'react-router-dom';
import MOCK_DATA from './../../../../data/refpartnerreptable.json';
import { COLUMNS } from './Column';
import "./refpartnerreptable.scss";
import RefMonthlyRepSingleModal from '../../../modals/RefMonthlyRepSingleModal';

const RefPartnerRepTable = () => {
    const [addInfoModal, setAddInfoModal] = useState(false);
    const toggleAddInfoModal = () => {
        setAddInfoModal(!addInfoModal);
    };

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }
        },
        usePagination
    );
    return (
        <>
            <div className="table-responsive-sm">
                <table className='mb-3 table-bg-even monthly-report-table' {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr className='parentrow' {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        <span>
                                            {column.render('Header')}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <React.Fragment key={row.id}>
                                    <tr className='parentrow' {...row.getRowProps()}>
                                        {row.cells.map(cell => (
                                            <td key={cell.getCellProps().key} {...cell.getCellProps()}>
                                                {cell.column.id === 'referral_partner' ? (
                                                    <Link onClick={toggleAddInfoModal}>
                                                        {cell.render('Cell')}
                                                    </Link>
                                                ) : (
                                                    cell.render('Cell')
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <RefMonthlyRepSingleModal 
                isOpen={addInfoModal} 
                toggle={toggleAddInfoModal} 
            />
        </>
    );
};

export default RefPartnerRepTable;