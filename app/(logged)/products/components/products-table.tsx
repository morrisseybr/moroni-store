"use client";

import getProducts from "@/actions/get-products";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Product } from "@/model/Product";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
export default function ProductsTable() {
  const columns = useMemo<ColumnDef<Product>[]>(
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

  const PAGE_SIZE = 2 as const;

  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const { products, total } = await getProducts({ limit: 2 });
      setProducts(products);
      setTotalPages(Math.ceil(total / PAGE_SIZE));
    })();
  }, []);

  const handleGetNextPage = async (lastDataId: string, pageSize: number) => {
    const { products } = await getProducts({
      afterProductId: lastDataId,
      limit: pageSize,
    });
    setProducts(products);
  };

  const handleGetPreviousPage = async (
    firstDataId: string,
    pageSize: number
  ) => {
    const { products } = await getProducts({
      beforeProductId: firstDataId,
      limit: pageSize,
    });
    setProducts(products);
  };

  return (
    <section>
      <DataTable
        columns={columns}
        data={products}
        totalPages={totalPages}
        pageSize={PAGE_SIZE}
        onGetNextPage={handleGetNextPage}
        onGetPreviousPage={handleGetPreviousPage}
      />
    </section>
  );
}
