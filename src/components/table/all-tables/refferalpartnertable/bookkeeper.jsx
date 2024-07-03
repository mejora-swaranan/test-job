import React, { useState, useMemo, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useTable, useRowSelect, useFilters, useSortBy, useGlobalFilter, usePagination, useExpanded } from 'react-table';
import { FaMinusCircle, FaPlusCircle, FaSortAmountDown, FaSortAmountUpAlt, FaRegTrashAlt, FaPen, FaCopy, FaClone, FaUser, FaEnvelope } from "react-icons/fa";
import Pagination from '../../../../hooks/PaginationControler';
import { GlobalFilter } from '../../../../hooks/GlobalFilter';
import { Bookkeepers_COLUMNS } from './columns';
import { Link } from 'react-router-dom'; 
import style from '../../../../assets/scss/custom.module.scss';
import './refferalpartnertable.scss';
import ReferralCustomerDetails from '../../../modals/ReferralCustomerDetails';

const Bookkeeper = () => {
    const columns = useMemo(() => Bookkeepers_COLUMNS, []);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCustomer, setShowCustomer] = useState(false);
    const [expandedRows, setExpandedRows] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const result = await axios.get("http://localhost:3030/referralUsers");
            setData(result.data.reverse());
        } catch (error) {
            console.error("Error loading referral users:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to load referral users.",
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
                text: "Are you sure you want to delete this Referral Partner?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#14bc96",
                cancelButtonColor: "#dc3545",
                confirmButtonText: "Confirm",
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3030/referralUsers/${rowId}`);
                loadUsers();
                Swal.fire({
                    title: "Deleted!",
                    text: "The referral partner has been deleted.",
                    icon: "success",
                });
            }
        } catch (error) {
            console.error("Error deleting referral partner:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to delete referral partner.",
                icon: "error",
            });
        }
    };

    const handleDuplicateClick = async (row) => {
        try {
            const newRow = { ...row.original, id: undefined };
            const result = await axios.post("http://localhost:3030/referralUsers", newRow);

            setData(prevData => {
                const rowIndex = prevData.findIndex(d => d.id === row.original.id);
                const newData = [...prevData];
                newData.splice(rowIndex + 1, 0, result.data);
                return newData;
            });

            Swal.fire({
                title: "Duplicated!",
                text: "The referral partner has been duplicated.",
                icon: "success",
            });
        } catch (error) {
            console.error("Error duplicating referral partner:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to duplicate referral partner.",
                icon: "error",
            });
        }
    };

    const toggleCustomerModal = () => {
        setShowCustomer(!showCustomer);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <table className='mt-2 mb-3 refferal-table-wrap' {...getTableProps()}>
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
                                    {row.cells.map((cell) => (
                                        <td key={cell.getCellProps().key} {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                    <td>
                                        <ul className={style.actionButtonList}>
                                            <li>
                                                <Link to={`/referral/edit/${row.id}`} className="edit btn-action btn-primary">
                                                    <FaPen />
                                                </Link>
                                                <button type="button" className="copy btn-action btn-primary">
                                                    <FaCopy />
                                                </button>
                                                <button type="button" className="duplicate btn-action btn-primary" onClick={() => handleDuplicateClick(row)}>
                                                    <FaClone />
                                                </button>
                                                <button type="button" className="user btn-action btn-primary" onClick={toggleCustomerModal}>
                                                    <FaUser />
                                                </button>
                                                <button type="button" className="email btn-action btn-primary">
                                                    <FaEnvelope />
                                                </button>
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

            <div className="d-flex flex-wrap mt-5 mb-5 justify-content-sm-between search">
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
                
                <div className={style.inputFilterBar}>
                    <GlobalFilter 
                        filter={globalFilter} 
                        setFilter={setGlobalFilter} 
                        columns={columns} 
                        placeholder="Search..."
                    />
                </div>
            </div>

            <ReferralCustomerDetails 
                isOpen={showCustomer}
                toggle={toggleCustomerModal}
            />
        </>
    );
};

export default Bookkeeper;
