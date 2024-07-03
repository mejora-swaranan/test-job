import React from "react";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {formatDate} from '../../../../utils/GeneralUtils';
export const COLUMNS = [
    {
        Header: 'ID',
        Footer: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Full Name',
        Footer: 'Full Name',
        accessor: 'name',
        Cell: ({ row }) => (
            <Link to={`/customer/client-details/${row.original.id}`}>
                {`${row.original.firstName} ${row.original.lastName}`}
            </Link>
        ),
    },
    {
        Header: 'Email Address',
        Footer: 'Email Address',
        accessor: 'primaryEmail',
    },
    {
        Header: 'Email Confirmed',
        Footer: 'Email Confirmed',
        accessor: 'isConfirmed',
        Cell: ({ value }) => (value === false ? <span className="text-warning"><FaInfoCircle/></span> : <span className="text-success"><FaCheckCircle/></span>)
    },
    // {
    //   Header: 'Roles',
    //   Footer: 'Roles',
    //   accessor: 'roles',
    // },
    {
        Header: 'Created At',
        Footer: 'Created At',
        accessor: 'createdAt',
        Cell: ({ value }) => formatDate(value),
    },
    {
        Header: 'Last Updated At',
        Footer: 'Last Updated At',
        accessor: 'updatedAt',
        Cell: ({ value }) => formatDate(value),
    }
]