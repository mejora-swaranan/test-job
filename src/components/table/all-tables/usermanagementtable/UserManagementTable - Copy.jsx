import React, { useState, useMemo, useCallback, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useBaseUrl } from '../../../../route/BaseUrlContext';
import {
    useTable,
    useRowSelect,
    useFilters,
    useSortBy,
    useGlobalFilter,
    usePagination,
    useExpanded
} from 'react-table';
import {
    FaMinusCircle,
    FaPlusCircle,
    FaSortAmountDown,
    FaSortAmountUpAlt
} from "react-icons/fa";
import Pagination from '../../../../hooks/PaginationControler';
import { GlobalFilter } from '../../../../hooks/GlobalFilter';
import { COLUMNS } from './Columns';
import { Link, useNavigate } from 'react-router-dom'; 
import { Checkbox } from '../../../../hooks/Checkbox';
import style from '../../../../assets/scss/custom.module.scss';
import './usermanagementtable.scss';
import TableActionBtnGroup from '../tableactionbtngroup/TableActionBtnGroup';
const UserManagementTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState(new Set());
    const history = useNavigate();
    const { baseUrl } = useBaseUrl();

    const loadUsers = useCallback(async () => {
        try {            
            const response = await axios.get(`${baseUrl}/admin/users?status=active`);
            setData(response.data.data);
        } catch (error) {
            console.error("Error loading users:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to load users.",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);
    
    useEffect(() => {
        loadUsers();    
    }, [loadUsers]);
    
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
        selectedFlatRows,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            autoResetSelectedRows: false,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
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

    const { globalFilter, pageIndex, pageSize } = state;

    const toggleRow = (rowId, event) => {
        event.stopPropagation();
        setExpandedRows(prevState => 
            prevState.includes(rowId) ? prevState.filter(id => id !== rowId) : [...prevState, rowId]
        );
    };

    const handleRowClick = (row) => {
        const rowId = row.id;
        const newSelectedRowIds = new Set(selectedRowIds);
        
        if (newSelectedRowIds.has(rowId)) {
            newSelectedRowIds.delete(rowId);
        } else {
            newSelectedRowIds.add(rowId);
        }
        
        setSelectedRowIds(newSelectedRowIds);

        console.log(row.original);
    };

    const handleDeleteClick = async (rowId) => {
        try {
            const result = await Swal.fire({
                text: "Are you sure you want to delete this User?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#14bc96",
                cancelButtonColor: "#dc3545",
                confirmButtonText: "Confirm",
            });

            if (result.isConfirmed) {
                await axios.patch(`http://localhost:3030/activeUsers/${rowId}`, { deleteStatus: "yes" });
                loadUsers();
                history('/access/user/deleted');
                Swal.fire({
                    title: "Deleted!",
                    text: "The User has been deleted.",
                    icon: "success",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to delete User.",
                icon: "error",
            });
        }
    };

    const handleDeleteSelected = async () => {
        try {
            const confirmed = await Swal.fire({
                text: 'Are you sure you want to delete selected Users?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#14bc96',
                cancelButtonColor: '#dc3545',
                confirmButtonText: 'Confirm',
            });
    
            if (confirmed.isConfirmed) {
                const selectedIds = selectedFlatRows.map(row => row.original.id);   
    
                await Promise.all(
                    selectedIds.map(async (rowId) => {
                        try {
                            await axios.patch(`http://localhost:3030/activeUsers/${rowId}`, { deleteStatus: "yes" });
                            console.log(`Deleted user with ID ${rowId}`);
                            history('/access/user/deleted');
                        } catch (error) {
                            console.error(`Failed to delete user with ID ${rowId}:`, error);
                            throw error;
                        }
                    })
                );
    
                // Clear selection after successful deletion
                setSelectedRowIds(new Set());
    
                // Reload data
                loadUsers();
    
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Selected Users have been deleted.',
                    icon: 'success',
                });
            }
        } catch (error) {
            console.error('Failed to delete selected Users:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to delete selected Users. Please try again later.',
                icon: 'error',
            });
        }
    };

    const viewUser = (userId) => {
        history(`/access/user/view-user/${userId}`);
    };
    
    const handleLoginUserClick = () => {
        history('#');
    };
    
    const handleChangePasswordClick = () => {
        history('#');
    };

    const handleDeactiveUserClick = () => {
        history('#');
    };  

    const handleResendClick = () => {
        history('#');
    }; 

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="d-flex flex-wrap mt-3 mb-3 justify-content-sm-between search">      
                <ul className={`${style.searchOptionWrap} d-flex flex-wrap align-items-center`}>
                    <li className='my-1'>                                    
                        <Link 
                            to="" 
                            className={`btn btn-danger ${selectedFlatRows.length === 0 ? 'disabled' : ''}`}
                            onClick={handleDeleteSelected}
                        >
                            Delete Selected Users
                        </Link>
                    </li>
                </ul>         
                <div className={style.inputFilterBar}>
                    <GlobalFilter 
                        filter={globalFilter} 
                        setFilter={setGlobalFilter} 
                        columns={columns} 
                        placeholder="Search..."
                    />
                </div>
            </div>
            <table className='mt-2 mb-3 usermangement-table-wrap' {...getTableProps()}>
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
                        const isSelected = row.isSelected;
                        return (
                            <React.Fragment key={row.id}>
                                <tr 
                                    className={`parentrow ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleRowClick(row)}
                                    {...row.getRowProps()}
                                >
                                    <td className='expand-td'>
                                        <span
                                            className='expandbtn'
                                            style={{ cursor: 'pointer' }}
                                            onClick={(e) => toggleRow(row.id, e)}
                                        >
                                            {isExpanded ? <FaMinusCircle /> : <FaPlusCircle />}
                                        </span>
                                    </td>                                    
                                        {row.cells.map((cell) => {
                                            const cellValue = cell.value;
                                            let cellContent = cellValue;
                                            return (
                                                <td key={cell.getCellProps().key} {...cell.getCellProps()}>
                                                    {cell.render('Cell', { value: cellContent })}
                                                </td>
                                            );
                                        })}
                                    <td>
                                        <TableActionBtnGroup 
                                            loginUser={() => handleLoginUserClick()}
                                            viewUser={() => viewUser(row.original.id)}
                                            editUrl={`/access/user/edit-user/${row.original.id}`}
                                            changePassword={() => handleChangePasswordClick()}
                                            deactivateUser={() => handleDeactiveUserClick()}
                                            reSend={() => handleResendClick()}
                                            onDelete={() => handleDeleteClick(row.original.id)} 
                                            tooltips={{
                                                loginUser: { id: "tooltip-login", content: "Login as User", place: "top" },
                                                viewUser: { id: "tooltip-view", content: "View", place: "top" },
                                                editUrl: { id: "tooltip-edit", content: "Edit", place: "top" },
                                                changePassword: { id: "tooltip-change-password", content: "Change Password", place: "top" },
                                                deactivateUser: { id: "tooltip-deactivate", content: "Deactivate", place: "top" },
                                                reSend: { id: "tooltip-resend", content: "Resend", place: "top" },
                                                onDelete: { id: "tooltip-delete", content: "Delete", place: "top" }
                                            }}
                                        >
                                        </TableActionBtnGroup>
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
            <div className="d-flex flex-wrap mt-5 mb-5 search">
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
            </div>
        </>
    );
};

export default UserManagementTable;
