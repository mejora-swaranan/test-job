import React, { useState, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { COLUMNS } from "./StandardColumns";
import DATA from "./data.json";
import "../pricingplantable.scss";
import {
   FaMinusCircle,
   FaPlusCircle,
   FaSortAmountDown,
   FaSortAmountUpAlt,
   FaRegTrashAlt,
   FaArchive,
   FaEdit,
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
import { Link } from "react-router-dom";

const StandardPricingPlan = () => {
   const columns = useMemo(() => COLUMNS, []);
   const data = useMemo(() => DATA.StandardPricingPlan, []);

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

   const handleDeleteClick = async (rowId) => {
      try {
         const result = await Swal.fire({
            text: "Are you sure to delete this sales lead?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#14bc96",
            cancelButtonColor: "#dc3545",
            confirmButtonText: "Confirm",
         });

         if (result.isConfirmed) {
            await axios.delete(
               `http://localhost:3000/platform-partner-api/${rowId}`
            );
            Swal.fire({
               title: "Deleted!",
               text: "The sales lead has been deleted.",
               icon: "success",
            });
         }
      } catch (error) {
         console.error("Error deleting sales user:", error);
      }
   };

   return (
      <>
         <div className="col-md-12 d-flex justify-content-between">
            <h2>Standard Pricing</h2>
         </div>
         <div className="col-md-12">
            <table
               className={`mt-2 mb-3 pricingplantable standardtable bgless_table`}
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
                        <th>Action</th>
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
                              <td>
                                 <ul className="sales-lead-icons">
                                    <li>
                                       <button
                                          type="button"
                                          className="delete"
                                          onClick={() =>
                                             handleDeleteClick(row.original.id)
                                          }>
                                          <FaRegTrashAlt />
                                       </button>
                                       <Link
                                          to="/pricing-plan/edit-plan"
                                          className="edit">
                                          <FaEdit />
                                       </Link>
                                       <button
                                          type="button"
                                          className="archive">
                                          {" "}
                                          <FaArchive />
                                       </button>
                                    </li>
                                 </ul>
                              </td>
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
                                                     row.original[
                                                        column.accessor
                                                     ]
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
         </div>
      </>
   );
};

export default StandardPricingPlan;
