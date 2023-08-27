"use client";

import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./button";
import { useCallback, useMemo, useState } from "react";

interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  pages: TData[][];
  onFetchNextPage: () => Promise<void>;
  hasNextPageToFetch: boolean;
  isFetchingNextPage?: boolean;
  pageSize?: number;
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  pages,
  onFetchNextPage,
  hasNextPageToFetch,
  isFetchingNextPage,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });
  const table = useReactTable({
    data: pages[pagination.pageIndex] || [],
    pageCount: pages.length || 1,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  const handleNextPage = useCallback(async () => {
    if (table.getCanNextPage()) {
      table.nextPage();
      return;
    } else if (hasNextPageToFetch) {
      await onFetchNextPage();
      table.setPageCount(pages.length);
      table.nextPage();
    }
  }, [table, hasNextPageToFetch, onFetchNextPage, pages.length]);

  const hasNextPage = table.getCanNextPage() || hasNextPageToFetch;

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={table.previousPage}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
