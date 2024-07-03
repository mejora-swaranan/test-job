import React, { useState } from 'react';
import { Table } from "reactstrap";
import ChildRow from './ChildRow';
import DATA from "./../../../assets/json/invoices.json";
import { Link } from 'react-router-dom';
import './invoicetable.scss';

const InvoiceTable = ({ children }) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    
    const INV_TITLE = DATA.header.columns;
    const Inv_Data = DATA.body;

    // Function to handle checkbox change in body
    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        if (newSelectAll) {
            const allIds = Inv_Data.map(item => item.id);
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
                        {INV_TITLE.map((listhead, headtitle) => (
                            <th key={headtitle}>{listhead}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Inv_Data.map((list) => (
                        <React.Fragment key={list.id}>
                            <tr>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(list.id)}
                                        onChange={() => toggleRow(list.id)}
                                    />
                                </td>
                                <td>
                                    <Link to="/dashboard/invoicedetails">
                                        {list.ft_no}
                                    </Link>
                                </td>
                                <td>{list.status}</td>
                                <td>{list.customer_status}</td>
                                <td>{list.profit_predict}</td>
                                <td>{list.overdue_predict}</td>
                                <td>{list.inv_no}</td>
                                <td>{list.date_funded}</td>
                                <td>{list.repay_date}</td>
                                <td>{list.total_days}</td>
                                <td>{list.customer}</td>
                                <td>{list.debtor}</td>
                                <td>{list.funded}</td>
                                <td>{list.quoted_fee}</td>
                                <td>{list.fee}</td>
                                <td>{list.fee_today}</td>
                                <td><textarea className="messagebox" /></td>
                            </tr>
                            {list.childRow && list.childRow.map(childItem => (
                                <ChildRow key={childItem.id} childItem={childItem} />
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
            <div>
                {children}
            </div>
        </>
    );
}

export default InvoiceTable;
