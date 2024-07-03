import { format } from 'date-fns';
import DatePicker from '../../../datepicker/DatePicker';
export const COLUMNS = [
  {
    Header: 'Funding Notice',
    Footer: 'Funding Notice',
    accessor: 'notice',
  },
  {
    Header: 'FT number',
    Footer: 'FT number',
    accessor: 'ftnumber',
  },
  {
    Header: 'Status',
    Footer: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Date Funded',
    Footer: 'Date Funded',
    accessor: 'datefunded',
    Cell: ({ value }) => {
      if (value && !isNaN(new Date(value))) {
        return format(new Date(value), 'dd-MMM-yyyy');
      } else {
        return '';
      }
    }
  },
  {
    Header: 'Due Date',
    Footer: 'Due Date',
    accessor: 'duedate',
    Cell: ({ value }) => {
      if (value && !isNaN(new Date(value))) {
        return format(new Date(value), 'dd-MMM-yyyy');
      } else {
        return '';
      }
    }
  },
  {
    Header: 'Invoice Number',
    Footer: 'Invoice Number',
    accessor: 'invocenumber',
  },
  {
    Header: 'Debtor',
    Footer: 'Debtor',
    accessor: 'debtor',
  },
  {
    Header: 'Principle',
    Footer: 'Principle',
    accessor: 'principle',
  },
  {
    Header: 'Fee (today)',
    Footer: 'Fee (today)',
    accessor: 'feetoday',
  },
  {
    Header: 'Payments',
    Footer: 'Payments',
    accessor: 'payments',
  },
  {
    Header: 'Payments Owing',
    Footer: 'Payments Owing',
    accessor: 'paymentsowing',
  },
  {
    Header: 'Repay Date',
    Footer: 'Repay Date',
    accessor: 'repaydate',
    Cell: ({ value }) => {
      return (
        <DatePicker
          value={value ? new Date(value) : null}
          onChange={(date) => {
          }}
        />
      );
    }
  },
]
