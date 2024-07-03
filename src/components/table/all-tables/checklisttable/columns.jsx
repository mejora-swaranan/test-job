export const BUSINESS_COLUMNS = [
	{
		Header: 'BUSINESS',
		Footer: 'BUSINESS',
		accessor: 'business',
	},
	{
		Header: 'NUMBERS',
		Footer: 'NUMBERS',
		accessor: 'numbers'
	},
	{
		Header: 'DETAILS',
		Footer: 'DETAILS',
		accessor: 'details'
	},
	{
		Header: '',
		Footer: '',
		accessor: 'blank'
	},
	{
		Header: 'test NOTES',
		Footer: 'test NOTES',
		accessor: 'test_notes',
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
]

export const OWNERS_COLUMNS = [
	{
		Header: 'OWNERS',
		Footer: 'OWNERS',
		accessor: 'owners',
	},
	{
		Header: 'OWNER 1',
		Footer: 'OWNER 1',
		accessor: 'owner_1',
	},
	{
		Header: '',
		Footer: '',
		accessor: 'owner_2',
	},
	{
		Header: '',
		Footer: '',
		accessor: 'owner_3',
	},
	{
		Header: 'test NOTES',
		Footer: 'test NOTES',
		accessor: 'test_notes',
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

]

export const TRUSTS_COLUMNS = [
	{
		Header: 'TRUSTS & CORPORATES',
		Footer: 'TRUSTS & CORPORATES',
		accessor: 'trusts_corporates',
	},
	{
		Header: 'TRUSTEE / DIRECTOR 1',
		Footer: 'TRUSTEE / DIRECTOR 1',
		accessor: 'director_1',
	},
	{
		Header: 'TRUSTEE / DIRECTOR 2',
		Footer: 'TRUSTEE / DIRECTOR 2',
		accessor: 'director_2',
	},
	{
		Header: 'TRUSTEE / DIRECTOR 3',
		Footer: 'TRUSTEE / DIRECTOR 3',
		accessor: 'director_3',
	},
	{
		Header: 'test NOTES',
		Footer: 'test NOTES',
		accessor: 'test_notes',
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

]

export const FINANCIALS_COLUMNS = [
	{
		Header: 'FINANCIALS',
		Footer: 'FINANCIALS',
		accessor: 'financials',
	},
	{
		Header: 'NOW -12M',
		Footer: 'NOW -12M',
		accessor: 'now_12m',
	},
	{
		Header: '12-24M',
		Footer: '12-24M',
		accessor: 'm12_m24',
	},
	{
		Header: '24-36M',
		Footer: '24-36M',
		accessor: 'm24_m36',
	},
	{
		Header: 'test NOTES',
		Footer: 'test NOTES',
		accessor: 'test_notes',
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

]