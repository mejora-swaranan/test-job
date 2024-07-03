// import React, { useMemo } from 'react';
// import { useTable, usePagination } from 'react-table';
// import MOCK_DATA from './MOCK_DATA.json';
// import { COLUMNS } from './columns';
// import './table.scss';
// import Pagination from '../../../hooks/PaginationControler';

// export const PaginationTable = () => {
//   // Memoize columns and data for optimization
//   const columns = useMemo(() => COLUMNS, []);
//   const data = useMemo(() => MOCK_DATA, []);

//   // Initialize table instance with pagination
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     state,
//     page,
//     gotoPage,
//     previousPage,
//     nextPage,
//     canPreviousPage,
//     canNextPage,
//     pageCount,
//     pageOptions,
//     setPageSize,
//     prepareRow
//   } = useTable(
//     {
//         columns,
//         data,
//         initialState: { pageIndex: 2 }
//     },
//     usePagination
//   )
  
//   const { pageIndex, pageSize } = state

//   return (
//     <>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map(row => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//         <div>
//             {/* Pass pagination-related props to your PaginationControler */}
//             <Pagination
//                 gotoPage={gotoPage}
//                 previousPage={previousPage}
//                 nextPage={nextPage}
//                 canPreviousPage={canPreviousPage}
//                 canNextPage={canNextPage}
//                 pageIndex={pageIndex}
//                 pageCount={pageCount}
//                 pageOptions={pageOptions}
//                 setPageSize={setPageSize}
//                 pageSize={pageSize}
//             />
//         </div>
//     </>
//   );
// };
