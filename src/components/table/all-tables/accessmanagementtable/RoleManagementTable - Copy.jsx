import React, { useState, useMemo, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useTable, useRowSelect, useFilters, useSortBy, useGlobalFilter, usePagination, useExpanded } from 'react-table';
import { FaMinusCircle, FaPlusCircle, FaSortAmountDown, FaSortAmountUpAlt, FaRegTrashAlt, FaPen } from "react-icons/fa";
import Pagination from '../../../../hooks/PaginationControler';
import { GlobalFilter } from '../../../../hooks/GlobalFilter';
import { COLUMNS } from './Columns';
import { Link } from 'react-router-dom';
import style from '../../../../assets/scss/custom.module.scss';
import './accessmanagement.scss';
import UserRoleListModal from '../../../modals/UserRoleListModal';

const RoleManagementTable = () => { 
    const columns = useMemo(() => COLUMNS, []);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const handleToggleModal = () => {
        setShowModal(!showModal)
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const result = await axios.get("http://localhost:3030/rollmanagement_user");
            const sortedData = result.data.sort((a, b) => a.sort - b.sort);
            setData(sortedData);
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to load Role Management.",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

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
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
    );

    const { globalFilter, pageIndex, pageSize } = state;

    const toggleRow = (rowId) => {
        setExpandedRows(prevState => 
            prevState.includes(rowId) ? prevState.filter(id => id !== rowId) : [...prevState, rowId]
        );
    };

    const handleDeleteClick = async (rowId) => {
        try {
            const result = await Swal.fire({
                text: "Are you sure you want to delete this Role Management?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#14bc96",
                cancelButtonColor: "#dc3545",
                confirmButtonText: "Confirm",
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3030/rollmanagement_user/${rowId}`);
                loadUsers();
                Swal.fire({
                    title: "Deleted!",
                    text: "The Role Management has been deleted.",
                    icon: "success",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to delete Role Management.",
                icon: "error",
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>

            <div className="d-flex flex-wrap mb-2 justify-content-sm-between search">
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
                
                <div className={`${style.inputFilterBar} sm-top-10`}>
                    <GlobalFilter 
                        filter={globalFilter} 
                        setFilter={setGlobalFilter} 
                        columns={columns} 
                        placeholder="Search..."
                    />
                </div>
            </div>
            <table className='mt-2 mb-3 role-management-table' {...getTableProps()}>
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
                            <th>Action</th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        const isExpanded = expandedRows.includes(row.id);
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
                                    {row.cells.map((cell) => {
                                        const cellValue = cell.value;
                                        let cellContent = cellValue;

                                        if (cell.column.id === 'permissions') {
                                            if (cellValue.toLowerCase() === 'all') {
                                                cellContent = <span className="permissions_content green">All</span>;
                                            } else {
                                                cellContent = <span>{cellValue}</span>;
                                            }
                                        }
                                        
                                        if (cell.column.id === 'number_of_users') {
                                            const userCount = cellValue === "" ? 0 : parseInt(cellValue, 10);
                                            cellContent = userCount > 0 ? <Link to="" onClick={handleToggleModal}>{cellValue}</Link> : "0";
                                        }
                                        
                                        return (
                                            <td key={cell.getCellProps().key} {...cell.getCellProps()}>
                                                {cell.render('Cell', { value: cellContent })}
                                            </td>
                                        );
                                    })}
                                    <td>
                                        <ul className={style.actionButtonList}>
                                            <li>
                                                <Link to="" className="edit btn-action btn-primary">
                                                    <FaPen />
                                                </Link>
                                                <button type="button" className="delete btn-action btn-primary red-bg" onClick={() => handleDeleteClick(row.original.id)}>
                                                    <FaRegTrashAlt />
                                                </button>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                {isExpanded && (
                                    <tr className='childrow colexpand'>
                                        <td colSpan={columns.length + 2}>
                                            <div className='tdbody'>
                                                {columns.map(column => (
                                                    <span key={column.accessor} data-label={column.Header}>
                                                        {String(row.original[column.accessor])}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
            <UserRoleListModal 
                isOpen={showModal}
                toggle={handleToggleModal}
            />
        </>
    );
};

export default RoleManagementTable;
