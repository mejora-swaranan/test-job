import { format } from 'date-fns'

export const COLUMNS = [
  {
    Header: 'DATE',
    Footer: 'DATE',
    accessor: 'date',
    Cell: ({ value }) => {
      if (value && !isNaN(new Date(value))) {
        return format(new Date(value), 'dd-MMM-yyyy');
      } else {
        return '';
      }
    }
  },
  {
    Header: 'AMOUNT',
    Footer: 'AMOUNT',
    accessor: 'amount',
  },
  {
    Header: 'TYPE',
    Footer: 'TYPE',
    accessor: 'type'
  },
  {
    Header: 'XERO STATUS',
    Footer: 'XERO STATUS',
    accessor: 'xero_status'
  },
  {
    Header: 'GOCARDLESS STATUS',
    Footer: 'GOCARDLESS STATUS',
    accessor: 'gocardless_status'
  },
]
