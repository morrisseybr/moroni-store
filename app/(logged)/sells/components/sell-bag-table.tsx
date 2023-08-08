"use client";

import { CreateSellFormData } from "@/actions/create-sell";
import { DataTable } from "@/components/ui/data-table";
import { InputCurrency } from "@/components/ui/input-currency";
import { TableActionButton, TableActions } from "@/components/ui/table";
import { ProductSummary } from "@/model/Product";
import { SellBag } from "@/model/Sell";
import { ColumnDef } from "@tanstack/react-table";
import { Minus, Plus, Trash } from "lucide-react";
import { useMemo } from "react";

type SellBagTableProps = {
  productsSummary: ProductSummary[];
  sellBag: CreateSellFormData["bag"];
  onAddQuantity: (itemId: string) => void;
  onSubtractQuantity: (itemId: string) => void;
  onPriceChange: (itemId: string, value?: string) => void;
  onRemoveItem: (itemId: string) => void;
};

export default function SellBagTable({
  productsSummary,
  sellBag,
  onAddQuantity,
  onSubtractQuantity,
  onPriceChange,
  onRemoveItem,
}: SellBagTableProps) {
  const sellBagWithId = useMemo(
    () =>
      sellBag.map((sellBag) => ({
        ...sellBag,
        id: sellBag.productId,
      })),
    [sellBag]
  );

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
                onClick={() => onAddQuantity(row.original.id)}
              >
                <Plus />
              </TableActionButton>
              <span>{row.original.quantity}</span>
              <TableActionButton
                disabled={row.original.quantity <= 1}
                onClick={() => onSubtractQuantity(row.original.id)}
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
                  onPriceChange(row.original.id, value);
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
    ],
    [
      onAddQuantity,
      onPriceChange,
      onRemoveItem,
      onSubtractQuantity,
      productsSummary,
    ]
  );

  return (
    <section>
      <DataTable columns={columns} data={sellBagWithId} />
    </section>
  );
}
