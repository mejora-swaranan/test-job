import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import MOCK_DATA from './../../../../data/refmonthlycommission.json';
import { COLUMNS } from './Column';
import './monthlyrefreport.scss';
// import "./refpartnerreptable.scss";

const MonthlyRefReport = () => {
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
            <div className='select-filter'>
                <select name="select_filter" id="select_filter">
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                </select>
            </div>
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

export default MonthlyRefReport;