"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { SellSummary } from "@/model/Sell";
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

type SellsTableProps = {
  sellsSummary: SellSummary[];
};
export default function SellsTable({ sellsSummary }: SellsTableProps) {
  const columns = useMemo<ColumnDef<SellSummary>[]>(
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
      <DataTable columns={columns} data={sellsSummary} />
    </section>
  );
}
