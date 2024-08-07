import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import MOCK_DATA from './../../../../data/refpartnerrepMtable.json';
import { MODAL_COLUMNS } from './Column';
import "./refpartnerreptable.scss";

const RefPartnerModalTable = () => {
    const columns = useMemo(() => MODAL_COLUMNS, []);
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
                <table className='mb-3 monthly-report-table' {...getTableProps()}>
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
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default RefPartnerModalTable;