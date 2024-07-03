import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { COLUMNS } from "./columns";
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
import "./salestable.scss";

const SalesleadTable = () => {
	const columns = useMemo(() => COLUMNS, []);
	const [data, setData] = useState([]);
	const [expandedRows, setExpandedRows] = useState([]);

	useEffect(() => {
		loadUsers();
	}, []);

	const loadUsers = async () => {
		try {
			const result = await axios.get("http://localhost:3030/salesUsers");
			setData(result.data.reverse());
		} catch (error) {
			console.error("Error loading sales users:", error);
		}
	};

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
			await axios.delete(`http://localhost:3030/salesUsers/${rowId}`);
			loadUsers();
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
		<div className="row mb-3">
			<div className="col-12 d-flex flex-wrap align-items-center justify-content-between">
				<div className="box-title py-2">
					<h3>Sales Lead People</h3>
				</div>
				<div className="slase-create-btn py-2">
					<Link to="/sales-lead/create" className="btn btn-primary rounded-1">
						Create Lead Person
					</Link>
				</div>
			</div>
		</div>
		<table className={`mt-2 mb-3 salesleadtable bgless_table`}
			{...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr className="parentrow" {...headerGroup.getHeaderGroupProps()}>
						<th></th>
						{headerGroup.headers.map((column) => (
						<th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
									{isExpanded ? <FaMinusCircle /> : <FaPlusCircle />}
								</span>
							</td>
							{row.cells.map((cell) => (
								<td key={cell.getCellProps().key} {...cell.getCellProps()}>
									{cell.render("Cell")}
								</td>
							))}
							<td>
								<ul className="sales-lead-icons">
									<li>
										<button
											type="button"
											className="delete"
											onClick={() => handleDeleteClick(row.original.id)}>
											<FaRegTrashAlt />
										</button>
										<Link
											to={`/sales-lead/edit/${row.id}`}
											className="edit">
											<FaEdit />
										</Link>
										<button type="button" className="archive">
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
											<span key={column.accessor} data-label={column.Header}>
												{column.accessor === "date"
													? format(
														new Date(row.original[column.accessor]),
														"dd-MMM-yyyy"
													)
												: String(row.original[column.accessor])}
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

export default SalesleadTable;
