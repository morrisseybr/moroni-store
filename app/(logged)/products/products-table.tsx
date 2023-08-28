"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ProductModel } from "@/core/model/Product";
import { trpc } from "@/trpc/client";
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
export default function ProductsTable({
  firstPage,
}: {
  firstPage: ProductModel[];
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.products.list.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage[lastPage?.length - 1]?.id,
        initialCursor: null,
        initialData: { pages: [firstPage], pageParams: [null] },
        keepPreviousData: true,
      }
    );
  const columns = useMemo<ColumnDef<ProductModel>[]>(
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
