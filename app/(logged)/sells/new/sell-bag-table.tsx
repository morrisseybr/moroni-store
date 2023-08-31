"use client";

import { DataTable } from "@/components/ui/data-table";
import { InputCurrency } from "@/components/ui/input-currency";
import { TableActionButton, TableActions } from "@/components/ui/table";
import { ProductModel } from "@/core/model/Product";
import { ColumnDef } from "@tanstack/react-table";
import { Minus, Plus, Trash } from "lucide-react";
import { useMemo } from "react";

export type SellBag = {
  product: ProductModel;
  price: number;
  quantity: number;
}[];

type SellBagTableProps = {
  sellBag: SellBag;
  onAddQuantity: (itemId: string) => void;
  onSubtractQuantity: (itemId: string) => void;
  onPriceChange: (itemId: string, value?: string) => void;
  onRemoveItem: (itemId: string) => void;
};

export default function SellBagTable({
  sellBag,
  onAddQuantity,
  onSubtractQuantity,
  onPriceChange,
  onRemoveItem,
}: SellBagTableProps) {
  const sellBagWithId = useMemo(() => {
    return sellBag.map((item) => ({
      ...item,
      id: item.product.id,
    }));
  }, [sellBag]);

  const columns = useMemo<ColumnDef<(typeof sellBagWithId)[number]>[]>(
    () => [
      {
        header: "Produto",
        accessorKey: "productName",
      },
      {
        header: "Quantidade",
        accessorKey: "quantity",
        cell: ({ row }) => {
          return (
            <TableActions justify="start">
              <TableActionButton
                disabled={row.original.quantity >= row.original.product.stock}
                onClick={() => onAddQuantity(row.original.product.id)}
              >
                <Plus />
              </TableActionButton>
              <span>{row.original.quantity}</span>
              <TableActionButton
                disabled={row.original.quantity <= 1}
                onClick={() => onSubtractQuantity(row.original.product.id)}
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
                value={row.original.price}
                onValueChange={(value) => {
                  onPriceChange(row.original.product.id, value);
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
              <TableActionButton
                onClick={() => onRemoveItem(row.original.product.id)}
              >
                <Trash />
              </TableActionButton>
            </TableActions>
          );
        },
      },
    ],
    [onAddQuantity, onPriceChange, onRemoveItem, onSubtractQuantity]
  );

  return (
    <section>
      <DataTable columns={columns} data={sellBagWithId} />
    </section>
  );
}
