import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { COLUMNS } from "./IDVerificationCol";
import DATA from "./data.json";
import {
   FaMinusCircle,
   FaPlusCircle,
   FaSortAmountDown,
   FaSortAmountUpAlt,
} from "react-icons/fa";
import {
   useTable,
   useRowSelect,
   useFilters,
   useSortBy,
   useGlobalFilter,
   usePagination,
   useExpanded,
} from "react-table";

const IDVerificationTable = () => {
   const columns = useMemo(() => COLUMNS, []);
   const data = useMemo(() => DATA.IDVerification, []);

   const [expandedRows, setExpandedRows] = useState([]);

   const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
      useTable(
         {
            columns,
            data,
            initialState: { pageIndex: 0 },
         },
         useFilters,
         useGlobalFilter,
         useSortBy,
         useExpanded,
         usePagination,
         useRowSelect
      );

   const toggleRow = (rowId) => {
      setExpandedRows((prev) =>
         prev.includes(rowId)
            ? prev.filter((id) => id !== rowId)
            : [...prev, rowId]
      );
   };

   return (
      <>
         <table
            className={`mt-2 mb-3 salesleadtable customer_idverification bgless_table`}
            {...getTableProps()}>
            <thead>
               {headerGroups.map((headerGroup) => (
                  <tr
                     className="parentrow"
                     {...headerGroup.getHeaderGroupProps()}>
                     <th></th>
                     {headerGroup.headers.map((column) => (
                        <th
                           {...column.getHeaderProps(
                              column.getSortByToggleProps()
                           )}>
                           <span>
                              {column.isSorted ? (
                                 column.isSortedDesc ? (
                                    <FaSortAmountDown />
                                 ) : (
                                    <FaSortAmountUpAlt />
                                 )
                              ) : (
                                 ""
                              )}
                           </span>
                           <span>{column.render("Header")}</span>
                        </th>
                     ))}
                  </tr>
               ))}
            </thead>
            <tbody {...getTableBodyProps()}>
               {page.map((row) => {
                  prepareRow(row);
                  const isExpanded = expandedRows.includes(row.id);
                  return (
                     <React.Fragment key={row.id}>
                        <tr className="parentrow" {...row.getRowProps()}>
                           <td className="expand-td">
                              <span
                                 className="expandbtn"
                                 style={{ cursor: "pointer" }}
                                 onClick={() => toggleRow(row.id)}>
                                 {isExpanded ? (
                                    <FaMinusCircle />
                                 ) : (
                                    <FaPlusCircle />
                                 )}
                              </span>
                           </td>
                           {row.cells.map((cell) => (
                              <td
                                 key={cell.getCellProps().key}
                                 {...cell.getCellProps()}>
                                 {cell.render("Cell")}
                              </td>
                           ))}
                        </tr>
                        {isExpanded && (
                           <tr className="childrow colexpand">
                              <td colSpan={columns.length + 2}>
                                 <div className="tdbody">
                                    {columns.map((column) => (
                                       <span
                                          key={column.accessor}
                                          data-label={column.Header}>
                                          {column.accessor === "date"
                                             ? format(
                                                  new Date(
                                                     row.original[
                                                        column.accessor
                                                     ]
                                                  ),
                                                  "dd-MMM-yyyy"
                                               )
                                             : String(
                                                  row.original[column.accessor]
                                               )}
                                       </span>
                                    ))}
                                 </div>
                              </td>
                           </tr>
                        )}
                     </React.Fragment>
                  );
               })}
            </tbody>
         </table>
      </>
   );
};

export default IDVerificationTable;
