"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ProductModel } from "@/core/model/Product";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
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
    useInfiniteQuery(
      ["products"],
      async ({ pageParam }) => {
        const response = await axios.get<ProductModel[]>("/api/products", {
          params: {
            cursor: pageParam,
          },
        });
        return response.data;
      },
      {
        getNextPageParam: (lastPage) => lastPage[lastPage?.length - 1]?.id,
        keepPreviousData: true,
        initialData: { pages: [firstPage], pageParams: [null] },
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
