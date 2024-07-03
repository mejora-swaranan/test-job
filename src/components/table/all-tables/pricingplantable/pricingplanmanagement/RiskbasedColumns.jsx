export const COLUMNS = [
   {
      Header: "Pricing Name",
      Footer: "Pricing Name",
      accessor: "pricingname",
   },
   {
      Header: "Standard Pricing Flat Rate(%)",
      Footer: "Standard Pricing Flat Rate(%)",
      accessor: "standard_pricing_flat",
   },
   {
      Header: "Standard Pricing P.A. Rate(%)",
      Footer: "Standard Pricing P.A. Rate(%)",
      accessor: "standard_pricing_pa",
   },
   {
      Header: "Overdue Flat Rate(%)",
      Footer: "Overdue Flat Rate(%)",
      accessor: "overdue_flat",
   },
   {
      Header: "Overdue P.A. Rate(%)",
      Footer: "Overdue P.A. Rate(%)",
      accessor: "overdue_pa",
   },
   {
      Header: "Trigger for Overdue",
      Footer: "Trigger for Overdue",
      accessor: "trigger_for_overdue",
   },
   {
      Header: "Max limit of risk",
      Footer: "Max limit of risk",
      accessor: "Maxlimitofrisk",
      Cell: ({ value }) => <input type="text" defaultValue={value} />,
   },
   {
      Header: "Min limit of risk",
      Footer: "Min limit of risk",
      accessor: "Minlimitofrisk",
      Cell: ({ value }) => <input type="text" defaultValue={value} />,
   },
];
