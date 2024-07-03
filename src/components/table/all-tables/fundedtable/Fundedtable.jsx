import React, { useState, useMemo } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { format } from 'date-fns';
import { COLUMNS } from './columns';
import MOCK_DATA from './../../../../data/funded_data.json';
import Pagination from '../../../../hooks/PaginationControler';
import { GlobalFilter } from './../../../../hooks/GlobalFilter';
import { FaMinusCircle, FaPlusCircle, FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import { useTable, useRowSelect, useFilters, useSortBy, useGlobalFilter, usePagination, useExpanded } from 'react-table';
import "./fundedtable.scss";
import DatePicker from '../../../datepicker/FundedDatePicker';

const Fundedtable = () => {    
    const [activeTab, setActiveTab] = useState('1');
    const [showNewDateButton, setShowNewDateButton] = useState(null);

    // for table
    const columns = useMemo(() => COLUMNS, []);
    // const data = useMemo(() => MOCK_DATA, []);
    const [data, setData] = useState(MOCK_DATA);

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
        useRowSelect
    );

    const { globalFilter, pageIndex, pageSize } = state;
    
    const handleDateChange = (date, rowId, columnId) => {
        const newData = data.map(item => {
            if (item.id === rowId) {
                return {
                    ...item,
                    [columnId]: date,
                };
            }
            return item;
        });
        setData(newData);
        setShowNewDateButton(rowId);
    };
    

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


    const handleNewDateButtonClick = () => {
        setShowNewDateButton(false);
        if (window.confirm("Are you sure you want to change the repayment date?")) {            
            alert("Success");
        } else {   
                     
        }
    };

    return (
        <>
            <div className="funded-data-filter-tab">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Nav tabs className="funded-nav">
                                <NavItem>
                                    <NavLink
                                        className={activeTab === '1' ? 'active' : ''}
                                        onClick={() => setActiveTab('1')}
                                    >
                                        All Invoices
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={activeTab === '2' ? 'active' : ''}
                                        onClick={() => setActiveTab('2')}
                                    >
                                        Due Now
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            
                            <TabContent activeTab={activeTab} id="profile-tabcontent">
                                <TabPane tabId="1">
                                    <div className="d-flex flex-wrap mt-5 mb-5 justify-content-sm-between funded-search">
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
                                            placeholder="Search..."
                                        />
                                    </div>              
                                    <table className='mt-2 mb-3 fundedtable' {...getTableProps()}>
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
                                                                <td key={cell.getCellProps().key} {...cell.getCellProps()}>
                                                                    {cell.column.id === 'repaydate' ? (
                                                                        <>                                                                            
                                                                            <DatePicker
                                                                                selected={new Date(cell.value)}
                                                                                onChange={(date) => handleDateChange(date, row.id, cell.column.id)} // Pass handleDateChange function                                                                            
                                                                            />
                                                                            
                                                                            {showNewDateButton === row.id &&
                                                                                <>
                                                                                    <button className='btn btn-primary new-pay-date' onClick={handleNewDateButtonClick}>Set New Date</button>
                                                                                </>
                                                                            }
                                                                        </>
                                                                    ) : (
                                                                        cell.render('Cell')
                                                                    )}
                                                                </td>
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
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="d-flex flex-wrap mt-5 mb-5 justify-content-sm-between funded-search">
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
                                            placeholder="Search..."
                                        />
                                    </div>              
                                    <table className='mt-2 mb-3 fundedtable duefundedtable' {...getTableProps()}>
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
                                                                <td key={cell.getCellProps().key} {...cell.getCellProps()}>
                                                                    {cell.column.id === 'repaydate' ? (
                                                                        <>
                                                                            <DatePicker
                                                                                selected={new Date(cell.value)}
                                                                                onChange={(date) => handleDateChange(date, row.id, cell.column.id)}                                                                                
                                                                            />                                                                            
                                                                            {showNewDateButton === row.id &&
                                                                                <>
                                                                                    <button className='btn btn-primary new-pay-date'>Set New Date</button>
                                                                                </>
                                                                            }
                                                                            
                                                                        </>
                                                                    ) : (
                                                                        cell.render('Cell')
                                                                    )}
                                                                </td>
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
                                </TabPane>
                            </TabContent>
                        </div>
                    </div>
                </div>        
            </div>  
            <div className="invoice-info-msg funded-bill">
                <h4>Due Now: <span>$737.19</span></h4>
                <h4>Total Owing*: <span>$737.19</span></h4>
                <div className="msg-wrap">
                    <p><small>*Total Owing includes invoices with a future payment date that are not yet due</small></p>
                    <p>Please make payment to our bank account and add the FT Number/s as the payment reference:</p>
                    <strong>
                        test<br/>
                        02-0192-0532860-00
                    </strong> 
                </div>
            </div>         

        </>
    );
};

export default Fundedtable;