"use client";

import { DataTable } from "@/components/ui/data-table";
import { TableActionButton, TableActions } from "@/components/ui/table";
import { Sell } from "@/model/Sell";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useMemo, useRef } from "react";

type SellBagTableProps = {
  bagItems: Sell["bag"];
};

export default function SellBagTable({ bagItems }: SellBagTableProps) {
  const bagItemsWithId = useMemo(
    () =>
      bagItems.map((bagItem) => ({
        ...bagItem,
        id: bagItem.productId,
      })),
    [bagItems]
  );

  const handleActionClick = (itemId: string) => {
    console.log("action clicked", itemId);
  };

  const columns = useRef<ColumnDef<(typeof bagItemsWithId)[number]>[]>([
    {
      header: "Produto",
      accessorKey: "productName",
    },
    {
      header: "Quantidade",
      accessorKey: "quantity",
    },
    {
      header: "Valor",
      accessorKey: "price",
    },
    {
      id: "actions",
      header: () => <div className="text-right">Ações</div>,
      cell: ({ row }) => {
        return (
          <TableActions>
            <TableActionButton
              onClick={() => handleActionClick(row.original.id)}
            >
              <Trash />
            </TableActionButton>
          </TableActions>
        );
      },
    },
  ]);

  return (
    <section>
      <DataTable columns={columns.current} data={bagItemsWithId} />
    </section>
  );
}
