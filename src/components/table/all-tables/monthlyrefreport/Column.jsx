export const COLUMNS = [
    {
        Header: 'CLIENT',
        accessor: 'client',
        columns: [
            {
                Header: '',
                accessor: 'client_name',
            }
        ]
    },
    {
        Header: "Jun-24",
        accessor: 'jun_24',
        columns: [
            {
                Header: 'Completed',
                accessor: 'completed_1',
            },
        ]
    },
    {
        Header: "May-24",
        accessor: 'may_24',
        columns: [
            {
                Header: 'Completed',
                accessor: 'completed_2',
            },
        ]
    },
    {
        Header: "Apr-24",
        accessor: 'apr_24',
        columns: [
            {
                Header: 'Completed',
                accessor: 'completed_3',
            },
        ]
    },
    {
        Header: "Mar-24",
        accessor: 'mar_24',
        columns: [
            {
                Header: 'Completed',
                accessor: 'completed_4',
            },
        ]
    },
    {
        Header: "TOTAL",
        accessor: 'total',
        columns: [
            {
                Header: 'Submitted',
                accessor: 'submitted',
            },
            {
                Header: 'Funded',
                accessor: 'funded',
            },
            {
                Header: 'Completed',
                accessor: 'completed_5',
            }
        ]
    }
]

export const PAY_COLUMNS = [
    {
        Header: 'Referral Payments',
        accessor: 'payments_total',
        columns: [
            {
                Header: '',
                accessor: 'referral_payments',
            },
            {
                Header: '',
                accessor: 'payments',
            },
        ]
    },
]