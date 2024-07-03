import React, { useMemo } from 'react';
import { useTable, useRowSelect, useFilters, useGlobalFilter, usePagination, useExpanded } from 'react-table';
import MOCK_DATA from './students.json';
import { COLUMNS } from './columns';
import './table.scss';
import { Checkbox } from './Checkbox';
import { GlobalFilter } from './GlobalFilter';
import Pagination from '../../../hooks/PaginationControler';
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

const ExpandTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        setGlobalFilter,
        state,
        page,
        gotoPage,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        pageCount,
        pageOptions,
        setPageSize,
        toggleRowExpanded,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }
        },
        useFilters,
        useGlobalFilter,
        useExpanded,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <Checkbox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
                },
                ...columns
            ]);
        }
    );

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} columns={columns} />
            <table className='mt-2 mb-3' {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            <th></th>
                            {headerGroup.headers.map(column => (
                                <th key={column.id} {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <React.Fragment key={row.id}>
                                <tr {...row.getRowProps()}>
                                    <td>
                                        {row.subRows && row.subRows.length > 0 && (
                                            <span
                                                onClick={() => toggleRowExpanded(row.id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {row.isExpanded ? <FaAngleDown /> : <FaAngleRight />}
                                            </span>
                                        )}
                                    </td>
                                    {row.cells.map(cell => (
                                        <td key={cell.getCellProps().key} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>

            <Pagination
                gotoPage={gotoPage}
                previousPage={previousPage}
                nextPage={nextPage}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageIndex={pageIndex}
                pageCount={pageCount}
                pageOptions={pageOptions}
                setPageSize={setPageSize}
                pageSize={pageSize}
            />
        </>
    );
};

export default ExpandTable;
