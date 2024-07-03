import React from 'react';

const ChildRow = ({ childItem }) => {
    return (
        <tr>
            <td><input type="checkbox" name="checkbox"/></td>
            <td>{childItem.ft_no}</td>
            <td>{childItem.status}</td>
            <td>{childItem.customer_status}</td>
            <td>{childItem.profit_predict}</td>
            <td>{childItem.overdue_predict}</td>
            <td>{childItem.inv_no}</td>
            <td>{childItem.date_funded}</td>
            <td>{childItem.repay_date}</td>
            <td>{childItem.total_days}</td>
            <td>{childItem.customer}</td>
            <td>{childItem.debtor}</td>
            <td>{childItem.funded}</td>
            <td>{childItem.quoted_fee}</td>
            <td>{childItem.fee}</td>
            <td>{childItem.fee_today}</td>
            <td><textarea className="messagebox" /></td>
        </tr>
    );
};

export default ChildRow;
