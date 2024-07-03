import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useRowSelect, useFilters, useGlobalFilter, usePagination, useExpanded } from 'react-table';
import Customer_DATA from './../../../data/customer.json';
import { COLUMNS } from './columns';
import { Checkbox } from './../../../hooks/Checkbox';
import { GlobalFilter } from './../../../hooks/GlobalFilter';
import Pagination from './../../../hooks/PaginationControler';
import { FaAngleDown, FaAngleRight, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import SelectFilter from "./../../../pages/invoice/index";
import './table.scss';
import InvoiceFilterShow from '../../../pages/invoice/InvoiceFilterShow';

const CustomerTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => Customer_DATA, []);  

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
        selectedFlatRows,
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
                        <Checkbox {...getToggleAllRowsSelectedProps()} className="headercheckBox" />
                    ),
                    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()}  className="bodycheckBox" />
                },
                ...columns
            ]);
        }
    );

    // for expand table row

    const [expandedRows, setExpandedRows] = useState([]);

    const toggleRow = (rowId) => {
        if (expandedRows.includes(rowId)) {
            setExpandedRows(expandedRows.filter(id => id !== rowId));
        } else {
            setExpandedRows([...expandedRows, rowId]);
        }
    };

    const isRowExpanded = (rowId) => expandedRows.includes(rowId);

    const { globalFilter, pageIndex, pageSize } = state;

    const [showTopHideFilter, setShowTopHideFilter] = useState(false);

    useEffect(() => {
        const anyRowsSelected = selectedFlatRows.length > 0;
        setShowTopHideFilter(anyRowsSelected);
    }, [selectedFlatRows]);

    return (
        <>
            {showTopHideFilter && (
                <div className='d-flex align-self-center top-hide-filter'>
                    <InvoiceFilterShow />
                </div>
            )}
            <div className='d-flex align-self-center justify-content-end main-filter-bar mb-3 flex-wrap'> 
                <SelectFilter />
                <div className="filtersearch mb-1 mt-1">
                    <GlobalFilter titleText="Search:" filter={globalFilter} setFilter={setGlobalFilter} columns={columns}  />
                </div>
            </div>
            <table className='mt-2 mb-3 allcustomtable customerdatatable invoice-dashboard' {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr className='parentrow' {...headerGroup.getHeaderGroupProps()}>
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
                        const isColumnbreack = isRowExpanded(row.id);

                        return (
                            <React.Fragment key={row.id}>
                                <tr className={`parentrow ${row.depth > 0 ? 'childrows' : ''}`} {...row.getRowProps()}>
                                    <td>
                                        {row.subRows && row.subRows.length > 0 && (
                                            <span
                                                onClick={() => toggleRowExpanded(row.id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {row.isExpanded ? <FaAngleDown /> : <FaAngleRight />}
                                            </span>
                                        )}
                                    
                                        <span
                                            className='expandbtn'
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => toggleRow(row.id)}
                                        >
                                            {isColumnbreack ? <FaMinusCircle style={{color: '#dc3545'}} /> : <FaPlusCircle style={{color: '#14bc96'}} />}
                                        </span>
                                    </td>                                    
                                    {row.cells.map(cell => (
                                        <td key={cell.getCellProps().key} {...cell.getCellProps()}>
                                            {cell.column.id === 'ft_no' ? (
                                                <Link to={`/dashboard/invoicedetails/${cell.value}`}>
                                                    {cell.render('Cell')}
                                                </Link>
                                            ) : (
                                                cell.render('Cell')
                                            )}
                                        </td>
                                    ))}
                                </tr>
                                
                                {isColumnbreack && (
                                    <tr className='colexpand'>
                                        <td colSpan={columns.length + 2}>
                                            <div className='tdbody'>
                                                {
                                                    columns.map(column => {
                                                        return (
                                                            <span key={column.accessor} data-label={column.Header}>
                                                                {row.original[column.accessor]}
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

export default CustomerTable;