import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { useTable, useSortBy, usePagination } from 'react-table';
import MOCK_DATA from './../../../../../data/fund_inv_data.json';
import { COLUMNS } from './columns';
import { FaMinusCircle, FaPlusCircle, FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import './fundinvtable.scss';

const FundInvTable = () => {

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
        useSortBy,
        usePagination
    );


    // for expand tr child row
    const [expandedRows, setExpandedRows] = useState([]);

    const toggleRow = (rowId) => {
        if (expandedRows.includes(rowId)) {
            setExpandedRows(expandedRows.filter(id => id !== rowId));
        } else {
            setExpandedRows([...expandedRows, rowId]);
        }
    };

    const isRowExpanded = (rowId) => expandedRows.includes(rowId);


    return (
        <>
            <table className='mb-3 fundinvtable' {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr className='parentrow' {...headerGroup.getHeaderGroupProps()}>
                            <th></th>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? <FaSortAmountDown /> : <FaSortAmountUpAlt />) : ''}
                                    </span>
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
                        const isExpanded = isRowExpanded(row.id);
                        return (
                            <React.Fragment key={row.id}>
                                <tr className='parentrow' {...row.getRowProps()}>
                                    <td className='expand-td'>
                                        <span
                                            className='expandbtn'
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => toggleRow(row.id)}
                                        >
                                            {isExpanded ? <FaMinusCircle /> : <FaPlusCircle />}
                                        </span>
                                    </td>
                                    {row.cells.map(cell => (
                                        <td key={cell.getCellProps().key} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                                {isExpanded && (
                                    <tr className='childrow colexpand'>
                                        <td colSpan={columns.length + 2}>
                                            <div className='tdbody'>
                                                {
                                                    columns.map(column => {
                                                        return (
                                                            <span key={column.accessor} data-label={column.Header}>
                                                                {column.accessor === 'date' ? format(new Date(row.original[column.accessor]), 'dd-MMM-yyyy') : String(row.original[column.accessor])}
                                                            </span>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default FundInvTable;
