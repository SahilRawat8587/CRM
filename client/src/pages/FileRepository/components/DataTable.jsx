import {
  
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUp, Trash2 } from "lucide-react";
import React, { useState } from "react";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");
  const [rowSelection, setRowSelection] = React.useState({})
  const [tableData, setTableData] = useState(data);


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filter,
      rowSelection,

    },
    onGlobalFilterChange: setFilter,
  });

  const handleDelete = () => {
    const selectedRowIds = Object.keys(rowSelection);
    const newData = tableData.filter((_, index) => !selectedRowIds.includes(index.toString()));
    setTableData(newData);
    setRowSelection({});
  };



  return (
    <div className="flex flex-col gap-4 w-[90%]">
    <div className="p-4 rounded-md border bg-[#F4EFCA]">
       {/* Search Filter */}
       <div className="flex items-center justify-between pb-4">
        <Input
          placeholder="Search..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
          disabled={Object.keys(rowSelection).length === 0}
          > <Trash2 /> </Button>
        
        <Button
          variant="outline"
          size="sm"
          > <FileUp /> </Button></div>
      </div>
      <Table>
        <TableHeader className="bg-[#F66435] text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-[#F66435]/10">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-2 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-between py-4">
    <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div></div>
    </div>
  );
}