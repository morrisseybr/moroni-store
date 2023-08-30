"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { SellModel } from "@/core/model/Sell";
import { trpc } from "@/trpc/client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const EditButton = ({ sellId }: { sellId: string }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-end">
      <Button
        variant="ghost"
        size="icon"
        title="Editar"
        onClick={() => router.push(`/sells/${sellId}`)}
      >
        <Pencil />
      </Button>
    </div>
  );
};
export default function SellsTable({ firstPage }: { firstPage: SellModel[] }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.sells.list.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage[lastPage?.length - 1]?.id,
        initialCursor: null,
        initialData: { pages: [firstPage], pageParams: [null] },
        keepPreviousData: true,
      }
    );
  const columns = useMemo<ColumnDef<SellModel>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Data",
        accessorKey: "date",
      },

      {
        id: "actions",
        header: () => <div className="text-right">Ações</div>,
        cell: ({ row }) => {
          return <EditButton sellId={row.original.id} />;
        },
      },
    ],
    []
  );

  return (
    <section>
      <DataTable
        columns={columns}
        pages={data?.pages || []}
        hasNextPageToFetch={!!hasNextPage}
        onFetchNextPage={async () => {
          await fetchNextPage();
        }}
        isFetchingNextPage={isFetchingNextPage}
      />
    </section>
  );
}
