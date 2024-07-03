import React, { useState, useMemo, useEffect } from 'react';
import { format } from 'date-fns';
import { useTable, useRowSelect, useFilters, useSortBy, useGlobalFilter, usePagination, useExpanded } from 'react-table';
import MOCK_DATA from './../../../../data/fund_invo_a.json';
import { COLUMNS } from './columns';
import { Checkbox } from './../../../../hooks/Checkbox';
import { GlobalFilter } from './../../../../hooks/GlobalFilter';
import Pagination from '../../../../hooks/PaginationControler';
import { FaMinusCircle, FaPlusCircle, FaInfoCircle, FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './fundtable.scss';
import { ThankYouModal } from '../../../modals/ThankYouModal';
import { CreditLimitModal } from "../../../modals/CreditLimitModal";
import { CreditInfoModal } from "../../../modals/CreditInfoModal";
import FundInvTable from './fundinvtable/FundInvTable';
import PromoCode from '../../../promocode/PromoCode';
import ManualUploadInv from '../../../modals/ManualUploadInv';

const FundTable = () => {

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
        selectedFlatRows,
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
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
                },
                ...columns
            ]);
        }
    );

    const { globalFilter, pageIndex, pageSize } = state;


    // for btn group show hide
    const [showButtons, setShowButtons] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const toggleThankModal = () => {
        setShowModal(!showModal);
    }

    useEffect(() => {
        const anyRowsSelected = selectedFlatRows.length > 0;
        setShowButtons(anyRowsSelected);
        setShowModal(anyRowsSelected);
    }, [selectedFlatRows]);

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

    
    // for credit modal
    const [addCreditModal, setAddCreditModal] = useState(false);
    const toggleAddCreditModal = () => {
        setAddCreditModal(!addCreditModal);
    };
    // for Info modal
    const [addInfoModal, setAddInfoModal] = useState(false);
    const toggleAddInfoModal = () => {
        setAddInfoModal(!addInfoModal);
    };

    // for manual upload
    const [addManualMoadal, setAddManualMoadal] = useState(false);
    const toggleManualModal = () => {
        setAddManualMoadal(!addManualMoadal);
    }

    // Calculate total invoice amount
    const selectedTotalInvoiceAmount = useMemo(() => {
        let total = 0;
        selectedFlatRows.forEach((row) => {
            total += parseFloat(row.original.invoice_total.replace('$', ''));
        });
        return total.toFixed(2);
    }, [selectedFlatRows]);

    return (
        <>
            {
                showButtons &&
                <div className="upper-quote-wrap mb-5">
                    <div className="quote-heading">
                        <h4>Funds to your account</h4>
                    </div>
                    <div className="quote-body">
                        <div className="quote-summary-container">
                            <p>test can provide funds of <span className='amount'>${selectedTotalInvoiceAmount}</span> in your account</p>
                            <p><small>(scroll down for more details)</small></p>
                        </div>
                    </div>
                    <div className="quote-footer text-center">
                        <div className="quote-checkbox d-flex justify-content-center align-items-center mb-3">
                            <input type="checkbox" className='mr-1' id='checkbox'/>
                            <label htmlFor="checkbox" className='d-flex justify-content-center align-items-center'>
                                I have read and accepted the test <button>Quote</button>
                            </label>
                        </div>
                        <div className="accept-btn-wrap mb-3">
                            <button className='btn btn-primary accept-btn'>Accept Quote</button>
                        </div>
                    </div>
                </div>
            }

            <table className='mt-2 mb-3 fundtable' {...getTableProps()}>
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
                
                <GlobalFilter 
                    filter={globalFilter} 
                    setFilter={setGlobalFilter} 
                    columns={columns} 
                    placeholder="search..."
                />

                <ThankYouModal 

                />
            </div>
            
            <div className={`fund-btn-group if-accounting-software-connected mb-5 ${showButtons ? 'hidden' : 'hidden'}`}>
                <div className="sync-btn">
                    <button className="btn btn-primary">Sync Invoices</button>
                </div>
                {/* if connected then hide accounting btn */}
                {/* <div className="link-btn">
                    <Link to='/invoices' className="btn btn-primary">Link to different Accounting Provider</Link>
                </div> */}
            </div>   

            {/* for manual upload */}
            <div className={`fund-btn-group if-manual-upload-preferred mb-5 ${showButtons ? 'hidden' : 'visible'}`}>
                <div className="sync-btn">
                    <button className="btn btn-primary" onClick={toggleManualModal}>Upload Invoices</button>
                </div>
                <div className="link-btn">
                    <Link to='/invoices' className="btn btn-primary">Link to Accounting Software</Link>
                </div>
            </div> 

            <div className={`fund-bottom-group ${showButtons ? 'hidden' : 'hidden'}`}>
                <div className="credit-section">
                    <p>Current Credit Limit: <strong>$10,000.00</strong></p>
                    <p>Current Outstanding <button className="info" onClick={toggleAddInfoModal}><sup><FaInfoCircle /></sup>
                    </button>: $536.60</p>
                    <p>Available for more Funding: $9,463.40</p>
                    <button className="credit-btn btn" onClick={toggleAddCreditModal}>Request Credit Limit Review</button>
                </div>

                <div className="invoice-info-msg">
                    <p>Don't see the invoices you expected to? <Link to="/">Click here</Link></p>
                    <p>Have questions need help? <Link to="mailto:info@test.co">email</Link> the test team or call us: AU: <Link to="tel:1800595505">1800 595 505</Link> or NZ: <Link to="tel:0800883355">0800 88 33 55</Link></p>                                        
                </div>
            </div>

            
            {/* for manual upload */}
            <div className={`fund-bottom-group ${showButtons ? 'hidden' : 'visible'}`}>
                <div className="invoice-info-msg">
                    <p>Don't see the invoices you expected to? <Link to="/">Click here</Link></p>
                    <p>Not ready to submit an invoice yet, but want some reassurance we can provide funding quickly in the future. Complete preapproval (it only takes 5-10 min). <Link to="/">Click here</Link></p>
                    <p>Have questions need help? <Link to="mailto:info@test.co">email</Link> the test team or call us: AU: <Link to="tel:1800595505">1800 595 505</Link> or NZ: <Link to="tel:0800883355">0800 88 33 55</Link></p>                                        
                </div>
            </div>

            {
                showButtons &&
                <div className='upper-quote-wrap mb-5'>
                    <div className="quote-table-wrap">
                        <FundInvTable />
                    </div>

                    <div className="promocode-wrap">
                        <PromoCode  
                            promotitle="Promo Code"
                            promoplaceholder="Enter Promo Code"
                        />
                    </div>

                    <div className="quote-footer text-center mt-3">
                        <div className="quote-checkbox d-flex justify-content-center align-items-center mb-3">
                            <input type="checkbox" className='mr-1' id='checkbox'/>
                            <label htmlFor="checkbox" className='d-flex justify-content-center align-items-center'>
                                I have read and accepted the test <button>Quote</button>
                            </label>
                        </div>
                        <div className="accept-btn-wrap mb-3">
                            <button className='btn btn-primary accept-btn'>Accept Quote</button>
                        </div>
                    </div>
                </div>
            }

            
            <CreditLimitModal 
                isOpen={addCreditModal} 
                toggle={toggleAddCreditModal} 
            />
            <CreditInfoModal 
                isOpen={addInfoModal} 
                toggle={toggleAddInfoModal} 
            />

            <ThankYouModal 
                isOpen={showModal} 
                toggle={toggleThankModal}
                title="Great news!"
                content="Because StockEdge are good sorts, you get a discount on your fee today! See the fee box below for details."
            />
            <ManualUploadInv 
                isOpen={addManualMoadal}
                toggle={toggleManualModal}
            />
        </>
    );
};

export default FundTable;
