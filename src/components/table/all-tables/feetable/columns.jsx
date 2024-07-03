import { format } from 'date-fns'

export const COLUMNS = [
  {
    Header: 'FEE ADJUST REPAY',
    Footer: 'FEE ADJUST REPAY',
    accessor: 'adjustmentAmount',
  },
  {
    Header: 'FEE ADJUST TODAY',
    Footer: 'FEE ADJUST TODAY',
    accessor: 'fee_adjust_today'
  },
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
    Header: 'COMMENT',
    Footer: 'COMMENT',
    accessor: 'comment'
  },
]
