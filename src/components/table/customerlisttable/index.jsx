import React, { useState } from 'react';
import { Table } from "reactstrap";
import { Link } from 'react-router-dom';
import DATA from "./../../../assets/json/customersdata.json";
import { FaCheck, FaTimes } from "react-icons/fa";
import './customerlisttable.scss';

const CustomerListTable = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const TABLE_TITLE = DATA.header.columns;
    const TABLE_Data = DATA.body;

    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        if (newSelectAll) {
            const allIds = TABLE_Data.map(item => item.id);
            setSelectedRows(allIds);
        } else {
            setSelectedRows([]);
        }
    };

    const toggleRow = (id) => {
        const index = selectedRows.indexOf(id);
        if (index === -1) {
            setSelectedRows([...selectedRows, id]);
        } else {
            const updatedSelectedRows = [...selectedRows];
            updatedSelectedRows.splice(index, 1);
            setSelectedRows(updatedSelectedRows);
        }
        if (selectAll) {
            setSelectAll(false);
        }
    };

    return (
        <>
            <Table size="sm" responsive="sm" className="table-wrapper">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={toggleSelectAll}
                            />
                        </th>
                        {TABLE_TITLE.map((listhead, headtitle) => (
                            <th key={headtitle}>{listhead}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {TABLE_Data.map((list) => (
                        <tr key={list.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(list.id)}
                                    onChange={() => toggleRow(list.id)}
                                />
                            </td>
                            <td key={`customer-${list.id}`}><Link to="/customer/client-details">{list.CUSTOMER}</Link></td>
                            <td>{list.STATUS}</td>
                            <td className="acc-icon">
                                {list.ACC === 'True' ? (
                                    <span className="primary-color">
                                        <FaCheck />
                                    </span>
                                ) : (
                                    <span className="secondary-color">
                                        <FaTimes />
                                    </span>
                                )}
                            </td>
                            <td className="acc-icon">
                                {list.INV_SUB === 'True' ? (
                                    <span className="primary-color">
                                        <FaCheck />
                                    </span>
                                ) : (
                                    <span className="secondary-color">
                                        <FaTimes />
                                    </span>
                                )}
                            </td>
                            <td>{list.USER}</td>
                            <td>{list.USER_TYPE}</td>
                            <td>{list.CREDIT_LIMIT}</td>
                            <td>{list.FUNDED_INVS}</td>
                            <td>{list.FUNDED_DUE}</td>
                            <td>{list.LAST_LOGIN}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default CustomerListTable;
