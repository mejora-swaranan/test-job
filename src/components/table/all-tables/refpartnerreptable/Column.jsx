export const COLUMNS = [
    {
        Header: 'Referral Partner',
        accessor: 'referral_partner',
    },
    {
        Header: "Customers",
        accessor: 'customers',
        columns: [
            {
                Header: 'Signed Up',
                accessor: 'signed_up',
            },
            {
                Header: 'Submitted',
                accessor: 'submitted',
            },
            {
                Header: 'Funded',
                accessor: 'funded',
            },
        ]
    },
    {
        Header: "Invoices",
        accessor: 'invoices',
        columns: [
            {
                Header: 'Funded',
                accessor: 'funded_inv',
            },
            {
                Header: 'Completed',
                accessor: 'completed',
            },
        ]
    },
    {
        Header: "Fees & Commission",
        accessor: 'fees_commission',
        columns: [
            {
                Header: 'Fees',
                accessor: 'fees',
            },
            {
                Header: 'Upfront',
                accessor: 'upfront',
            },
            {
                Header: 'Trail',
                accessor: 'trail',
            }
        ]
    }
]

export const MODAL_COLUMNS = [
    {
        Header: 'Customers',
        accessor: 'customers_title',
        columns: [
            {
                Header: 'MMCA',
                accessor: 'customers_name',
            },
        ]
    },
    {
        Header: "Customers",
        accessor: 'customers',
        columns: [
            {
                Header: 'Signed Up',
                accessor: 'signed_up',
            },
            {
                Header: 'Submitted',
                accessor: 'submitted',
            },
            {
                Header: 'Funded',
                accessor: 'funded',
            },
        ]
    },
    {
        Header: "Invoices",
        accessor: 'invoices',
        columns: [
            {
                Header: 'Funded',
                accessor: 'funded_inv',
            },
            {
                Header: 'Completed',
                accessor: 'completed',
            },
        ]
    },
    {
        Header: "Fees & Commission",
        accessor: 'fees_commission',
        columns: [
            {
                Header: 'Fees',
                accessor: 'fees',
            },
            {
                Header: 'Upfront',
                accessor: 'upfront',
            },
            {
                Header: 'Trail',
                accessor: 'trail',
            }
        ]
    }
]

