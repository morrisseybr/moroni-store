"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ProductSummary } from "@/model/Product";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const EditButton = ({ productId }: { productId: string }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-end">
      <Button
        variant="ghost"
        size="icon"
        title="Editar"
        onClick={() => router.push(`/products/${productId}`)}
      >
        <Pencil />
      </Button>
    </div>
  );
};

type ProductsTableProps = {
  productsSummary: ProductSummary[];
};
export default function ProductsTable({ productsSummary }: ProductsTableProps) {
  const columns = useMemo<ColumnDef<ProductSummary>[]>(
    () => [
      {
        header: "Nome",
        accessorKey: "name",
      },
      {
        header: "Estoque",
        accessorKey: "stock",
      },
      {
        header: () => <div className="text-right">Preço</div>,
        accessorKey: "price",
        cell: ({ row }) => {
          const amount = row.original.price;
          const formattedAmount = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount);
          return <div className={`text-right`}>{formattedAmount}</div>;
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right">Ações</div>,
        cell: ({ row }) => {
          return <EditButton productId={row.original.id} />;
        },
      },
    ],
    []
  );

  return (
    <section>
      <DataTable columns={columns} data={productsSummary} />
    </section>
  );
}
