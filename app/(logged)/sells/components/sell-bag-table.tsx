"use client";

import { DataTable } from "@/components/ui/data-table";
import { InputCurrency } from "@/components/ui/input-currency";
import { TableActionButton, TableActions } from "@/components/ui/table";
import { ProductSummary } from "@/model/Product";
import { Sell } from "@/model/Sell";
import { ColumnDef } from "@tanstack/react-table";
import { Minus, Plus, Trash } from "lucide-react";
import { useMemo, useRef } from "react";

type SellBagTableProps = {
  productsSummary: ProductSummary[];
  bagItems: Sell["bag"];
  onRemoveItem: (itemId: string) => void;
  onAddQuantity: (itemId: string) => void;
  onSubtractQuantity: (itemId: string) => void;
  onPriceChange: (itemId: string, price: number) => void;
};

export default function SellBagTable({
  productsSummary,
  bagItems,
  onRemoveItem,
  onAddQuantity,
  onSubtractQuantity,
  onPriceChange,
}: SellBagTableProps) {
  const bagItemsWithId = useMemo(
    () =>
      bagItems.map((bagItem) => ({
        ...bagItem,
        id: bagItem.productId,
      })),
    [bagItems]
  );

  const columns = useRef<ColumnDef<(typeof bagItemsWithId)[number]>[]>([
    {
      header: "Produto",
      accessorKey: "productName",
    },
    {
      header: "Quantidade",
      accessorKey: "quantity",
      cell: ({ row }) => {
        const actualProductSummary = productsSummary.find(
          (product) => product.id === row.original.productId
        );
        return (
          <TableActions justify="start">
            <TableActionButton
              disabled={
                actualProductSummary &&
                row.original.quantity >= actualProductSummary.stock
              }
              onClick={() => onAddQuantity(row.original.productId)}
            >
              <Plus />
            </TableActionButton>
            <span>{row.original.quantity}</span>
            <TableActionButton
              disabled={row.original.quantity <= 1}
              onClick={() => onSubtractQuantity(row.original.productId)}
            >
              <Minus />
            </TableActionButton>
          </TableActions>
        );
      },
    },
    {
      header: "Valor",
      accessorKey: "price",
      cell: ({ row }) => {
        return (
          <TableActions justify="start">
            <InputCurrency
              defaultValue={row.original.price}
              onValueChange={(value) => {
                onPriceChange(
                  row.original.productId,
                  Number(value?.replace(",", ".") || 0)
                );
              }}
            />
          </TableActions>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Ações</div>,
      cell: ({ row }) => {
        return (
          <TableActions>
            <TableActionButton onClick={() => onRemoveItem(row.original.id)}>
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
