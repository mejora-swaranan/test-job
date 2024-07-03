export const COLUMNS = [
    {
      Header: 'ID',
      Footer: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      Footer: 'Name',
      accessor: 'fullName',
      Cell: ({ row }) => (
          <div>
              {row.original.name} {row.original.middleName && `${row.original.middleName} `}{row.original.lastName}
          </div>
      )
    },
    {
      Header: 'E-mail',
      Footer: 'E-mail',
      accessor: 'email',
    },
    {
      Header: 'Confirmed',
      Footer: 'Confirmed',
      accessor: 'status',
      Cell: ({ value }) => (value === "0" ? "No" : "Yes")
    },
    {
      Header: 'Roles',
      Footer: 'Roles',
      accessor: 'roles',
    },
    {
      Header: 'Created',
      Footer: 'Created',
      accessor: 'created',
    },
    {
      Header: 'Last Update',
      Footer: 'Last Update',
      accessor: 'last_update',
    }
]