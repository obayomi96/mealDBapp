"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ArrowLeft, ArrowRightOutlined } from "@mui/icons-material";

const getPersistedPageSize = (defaultSize: any) => {
  if (typeof window !== "undefined") {
    return Number(localStorage.getItem("pageSize")) || defaultSize;
  }
  return defaultSize;
};

const persistPageSize = (size: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("pageSize", size);
  }
};

interface TableProps<T extends object> {
  columns: ColumnDef<T, any>[];
  data: T[];
  onTableRowClick?: (row: T) => void;
  pageSize?: number;
  tableTopTitle?: string;
  tableTopSearchFieldPlaceholderText?: string;
  enableSorting?: boolean;
  sortableFields?: string[];
}

function CustomTable<T extends object>({
  columns,
  data,
  onTableRowClick,
  pageSize = 10,
  tableTopTitle,
  tableTopSearchFieldPlaceholderText,
  enableSorting = false,
  sortableFields = []
}: TableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSizeState, setPageSize] = useState(getPersistedPageSize(pageSize));

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination: {
        pageIndex,
        pageSize: pageSizeState
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    onPaginationChange: (updater: any) => {
      const newState = updater(table.getState().pagination);
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
    onGlobalFilterChange: setGlobalFilter
  });

  useEffect(() => {
    persistPageSize(pageSizeState);
  }, [pageSizeState]);

  return (
    <div className="py-4 bg-[#f9fafb]">
      <p className="text-base font-medium text-[#344054]">{tableTopTitle}</p>
      <div className="w-full flex justify-between items-center my-4">
        <div className="w-[23.4375rem] ">
          <div className="h-[2.25rem] w-full rounded-[0.25rem] py-[0.6rem] px-1 flex items-center justify-between gap-[4px] border border-[#D0D5DD] focus:border-[#BBDFF2] bg-white">
            <input
              type="text"
              placeholder={tableTopSearchFieldPlaceholderText}
              onChange={(e: any) => {
                setGlobalFilter(e.target.value);
              }}
              value={globalFilter}
              autoComplete="off"
              className={`placeholder-[#98A2B3] placeholder:text-opacity-[65%] w-full h-full outline-0 px-2 text-[0.875rem] leading-normal font-normal`}
            />
          </div>
        </div>
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr
              key={headerGroup.id}
              className="bg-[#F0F2F5] text-[#eee] text-sm font-semibold capitalize"
            >
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="p-[0.75rem] text-left font-medium bg-[#F0F2F5]"
                  onClick={
                    sortableFields.includes(header.column.id)
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {sortableFields.includes(header.column.id) &&
                  header.column.getIsSorted() ? (
                    header.column.getIsSorted() === "asc" ? (
                      <span> 🔼</span>
                    ) : (
                      <span> 🔽</span>
                    )
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="hover:bg-gray-100 border-b border-[#E4E7EC] text-[#282828] text-sm font-normal p-[0.75rem]"
            >
              {row.getVisibleCells().map((cell: any) => (
                <td
                  key={cell.id}
                  onClick={() => {
                    if (onTableRowClick) {
                      onTableRowClick(row.original);
                    }
                  }}
                  className="p-[0.75rem] capitalize cursor-pointer"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-[#f9fafb] w-full mt-4 text-sm flex items-center justify-between">
        <div className="text-[#667185]">{`${data?.length} rows found`}</div>
        <div className="flex items-center justify-center gap-x-6">
          <button
            className="font-semibold w-auto flex items-center"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span>
              <ArrowLeft className="" />
            </span>
            Previous
          </button>
          <span className="text-[#667185] gap-x-6">
            <span className="h-[2.25rem] w-auto rounded-full bg-[#E9F5FB] border border-[#2597D5] p-[8px] px-[0.75rem] mx-3 md:mx-8">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            {"... "}
            <span className="mx-3 md:mx-8">{table.getPageCount()}</span>
          </span>
          <button
            className="font-semibold w-auto flex items-center"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next <ArrowRightOutlined className="" />
          </button>
        </div>
        <div className="flex justify-end items-center text-[#667185]">
          Display
          <select
            className="ml-2 p-2 border border-gray-300 rounded-md"
            value={table.getState().pagination.pageSize}
            onChange={e => {
              const newSize = Number(e.target.value);
              setPageSize(newSize);
              table.setPageSize(newSize);
              setPageIndex(0);
            }}
          >
            {[10, 20, 30, 40, 50].map(size => (
              <option key={size} value={size}>
                {size} rows
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default CustomTable;
