import React, { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { useTable, useSortBy, usePagination } from 'react-table';
import Fee_DATA from '../../../../data/paymenttable.json';
import { COLUMNS } from './columns';
import { FaPlusCircle, FaMinusCircle, FaSortAmountUpAlt, FaSortAmountDown, FaTimes, FaPlus, FaPencilAlt } from "react-icons/fa";
import styles from "./../../../../assets/scss/custom.module.scss";
import './paymenttable.scss';
import { PaymentModal } from '../../../modals/PaymentModal';
import { SuccessfullModal } from '../../../modals/SuccessfullModal';

const PaymentTable = () => {
    // modal add edit
    const [addPayModal, setAddPayModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [defaultValues, setDefaultValues] = useState({});
    const [editedRow, setEditedRow] = useState(null);
    const [data, setData] = useState(Fee_DATA);    
    const [showSuccessfulModal, setShowSuccessfulModal] = useState(false);

    const toggleAddPayModal = (rowData) => {
        if (rowData) {
            setEditMode(true);
            setDefaultValues(rowData);
            setEditedRow(rowData);
        } else {
            setEditMode(false);
            setDefaultValues({});
            setEditedRow(null);
        }
        setAddPayModal(!addPayModal);
    };

    // react table
    const columns = useMemo(() => COLUMNS, []);

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

    const handleRowSubmit = (rowData) => {
        if (editMode && editedRow) {
            const updatedData = data.map(row => (row.id === editedRow.id ? rowData : row));
            setData(updatedData);
        } else {            
            const updatedData = [...data, { id: uuidv4(), ...rowData }];
            setData(updatedData);
        }
        toggleAddPayModal();
        setShowSuccessfulModal(true);
    };
    
    // for delete row
    const deleteRow = (id) => {
        const updatedData = data.filter(row => row.id !== id);
        setData(updatedData);
    };

    const [expandedRows, setExpandedRows] = useState([]);

    const toggleRow = (rowId) => {
        if (expandedRows.includes(rowId)) {
            setExpandedRows(expandedRows.filter(id => id !== rowId));
        } else {
            setExpandedRows([...expandedRows, rowId]);
        }
    };

    const isRowExpanded = (rowId) => expandedRows.includes(rowId);

    // Calculate total amount
    const totalAmount = useMemo(() => {
        return data.reduce((total, row) => {
            const rowAmount = parseFloat(row.amount.replace(/[^\d.]/g, '')) || 0;
            return total + rowAmount;
        }, 0);
    }, [data]);

    return (
        <>
            <table className='paymenttable' {...getTableProps()}>
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
                            <th></th>
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
                                    <td>
                                        <span
                                            className='expandbtn'
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => toggleRow(row.id)}
                                        >
                                            {isExpanded ? <FaMinusCircle /> : <FaPlusCircle />}
                                        </span>
                                    </td>
                                    {row.cells.map((cell, index) => (
                                        <td key={cell.getCellProps().key} {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                    <td>
                                        <ul className={`${styles.btngroupwrap} d-flex justify-content-end align-items-center`}>
                                            <li>
                                                <button className={`${styles.btnPrimary} edit-btn added-icon`} onClick={() => toggleAddPayModal(row.original)}>
                                                    <FaPencilAlt />
                                                </button>
                                            </li>
                                            <li>
                                                <button className={`${styles.btnPrimary} added-icon`} onClick={() => deleteRow(row.original.id)}>
                                                    <FaTimes />
                                                </button>
                                            </li>
                                        </ul>
                                    </td>
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
                <tfoot>
                    <tr>
                        <td></td>
                        <td colSpan="3">
                            <strong>Total Payment</strong> <span className="totalamount">${totalAmount.toFixed(2)}</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <ul className={`${styles.btngroupwrap} d-flex justify-content-end align-items-center`}>
                                <li>
                                    <button className={styles.btnPrimary} onClick={() => toggleAddPayModal()}>
                                        <FaPlus />
                                    </button>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tfoot>
            </table>

            
            {/* for edit payment modal */}
            <PaymentModal
                isOpen={addPayModal} 
                toggle={toggleAddPayModal}  
                defaultValues={defaultValues}
                editMode={editMode}
                editedRow={editedRow}
                onRowSubmit={handleRowSubmit}
            />

            <SuccessfullModal
                isOpen={showSuccessfulModal} 
                toggle={() => setShowSuccessfulModal(false)} 
                title=""
                message="Successfully update payment."
            />
        </>
    );
};

export default PaymentTable;
