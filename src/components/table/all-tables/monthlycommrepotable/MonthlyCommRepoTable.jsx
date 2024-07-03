import React, { useMemo, useState } from 'react';
import { useTable, useRowSelect, useFilters, useGlobalFilter, usePagination, useExpanded } from 'react-table';
import Customer_DATA from './../../../../data/monthlyCommissionTable.json';
import { COLUMNS } from './Column';
import { Checkbox } from './../../../../hooks/Checkbox';
import { FaAngleDown, FaAngleRight, FaEnvelope, FaPen, FaCalendarCheck } from "react-icons/fa";
import style from './../../../../assets/scss/custom.module.scss';
import "./mcommissionrepo.scss";
import UpfrontCommissionModal from '../../../modals/UpfrontCommissionModal';


const MonthlyCommRepoTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => Customer_DATA, []);  
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        toggleRowExpanded,
    } = useTable(
        {
            columns,
            data,
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

    const [showUpfrontModal, setShowUpfrontModal] = useState(false)
    const toggleShowModdal = () => {
        setShowUpfrontModal(!showUpfrontModal);
    }

    return (
        <>
            <div className="table-responsive-sm">
                <table className='mt-2 mb-3 allcustomtable invoice-dashboard mcommission-table-wrap' {...getTableProps()}>
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
                                        </td>                                    
                                        {row.cells.map(cell => (
                                            <td key={cell.getCellProps().key} {...cell.getCellProps()}>
                                                {cell.column.id === 'action' ? (
                                                    <>
                                                        <ul className={style.actionButtonList}>
                                                            <li>
                                                                <button type="button" className="email btn-action btn-primary" onClick={toggleShowModdal}>
                                                                    <FaEnvelope />
                                                                </button>
                                                                <button type="button" className="edit btn-action btn-primary">
                                                                    <FaPen />
                                                                </button>
                                                                <button type="button" className="calender btn-action btn-primary">
                                                                    <FaCalendarCheck />
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </>
                                                ) : (
                                                    cell.render('Cell')
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <UpfrontCommissionModal 
                toggle={toggleShowModdal}
                isOpen={showUpfrontModal}
            />
        </>
    );
};

export default MonthlyCommRepoTable;