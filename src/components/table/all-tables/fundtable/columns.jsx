import { format } from 'date-fns';
export const COLUMNS = [
  {
    Header: 'Invoice Number',
    Footer: 'Invoice Number',
    accessor: 'invoice_number',
  },
  {
    Header: 'Customer',
    Footer: 'Customer',
    accessor: 'customer',
  },
  {
    Header: 'Invoice Total',
    Footer: 'Invoice Total',
    accessor: 'invoice_total'
  },
  {
    Header: 'Due Date',
    Footer: 'Due Date',
    accessor: 'due_date',
    Cell: ({ value }) => {
      if (value && !isNaN(new Date(value))) {
        return format(new Date(value), 'dd-MMM-yyyy');
      } else {
        return '';
      }
    }
  },
]
