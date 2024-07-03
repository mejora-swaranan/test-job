import { format } from 'date-fns'

export const COLUMNS = [
  {
    Header: 'CREDIT SCORE',
    Footer: 'CREDIT SCORE',
    accessor: 'credit_score',
  },
  {
    Header: 'CREDIT RISK',
    Footer: 'CREDIT RISK',
    accessor: 'credit_risk',
  },
  {
    Header: 'ADVERSE',
    Footer: 'ADVERSE',
    accessor: 'adverse'
  },
  {
    Header: 'ACTIVITY',
    Footer: 'ACTIVITY',
    accessor: 'activity'
  },
  {
    Header: 'GENERATED',
    Footer: 'GENERATED',
    accessor: 'generated',
    Cell: ({ value }) => {
      if (value && !isNaN(new Date(value))) {
        return format(new Date(value), 'dd-MMM-yyyy');
      } else {
        return '';
      }
    }
  },
]
