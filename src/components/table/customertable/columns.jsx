import { format } from 'date-fns'

export const COLUMNS = [
  {
    Header: 'FT No.',
    Footer: 'FT No.',
    accessor: 'ft_no',
  },
  {
    Header: 'Status',
    Footer: 'Status',
    accessor: 'status'
  },
  {
    Header: 'Customer Status',
    Footer: 'Customer Status',
    accessor: 'customer_status'
  },
  {
    Header: 'Profit Predict',
    Footer: 'Profit Predict',
    accessor: 'profit_predict'
  },
  {
    Header: 'Overdue Predict',
    Footer: 'Overdue Predict',
    accessor: 'overdue_predict'
  },
  {
    Header: 'Inv. No.',
    Footer: 'Inv. No.',
    accessor: 'inv_no'
  },
  {
    Header: 'Date Funded',
    Footer: 'Date Funded',
    accessor: 'date_funded',
    Cell: ({ value }) => {
      if (value && !isNaN(new Date(value))) {
        return format(new Date(value), 'dd-MMM-yyyy');
      } else {
        return 'N/A';
      }
    }
  },
  {
    Header: 'Repay Date',
    Footer: 'Repay Date',
    accessor: 'repay_date',
    Cell: ({ value }) => {
      if (value && !isNaN(new Date(value))) {
        return format(new Date(value), 'dd-MMM-yyyy');
      } else {
        return '';
      }
    }
  },
  {
    Header: 'Total Days',
    Footer: 'Total Days',
    accessor: 'total_days'
  },
  {
    Header: 'Customer',
    Footer: 'Customer',
    accessor: 'customer'
  },
  {
    Header: 'Debtor',
    Footer: 'Debtor',
    accessor: 'debtor'
  },
  {
    Header: 'Funded',
    Footer: 'Funded',
    accessor: 'funded'
  },
  {
    Header: 'Quoted Fee',
    Footer: 'Quoted Fee',
    accessor: 'quoted_fee'
  },
  {
    Header: 'Fee',
    Footer: 'Fee',
    accessor: 'fee'
  },
  {
    Header: 'Fee Today',
    Footer: 'Fee Today',
    accessor: 'fee_today'
  },
  {
    Header: 'Comments',
    Footer: 'Comments',
    accessor: 'comments',
    Cell: ({ value, row }) => {
      const handleChange = (event) => {
        row.original.comments = event.target.value;
      };
  
      return (
        <textarea
          value={value}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      );
    }
  },
  {
    Header: 'Alert',
    Footer: 'Alert',
    accessor: 'alert'
  },
]
