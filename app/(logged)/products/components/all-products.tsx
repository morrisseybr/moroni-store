"use client";

import { DataTable } from "@/components/ui/data-table";
import { Product } from "@/model/Product";
import { ColumnDef } from "@tanstack/react-table";

const products: Product[] = [
  {
    id: "1",
    name: "Produto 1",
    description: "Descrição do produto 1",
    type: "shirt",
    gender: "male",
    size: "m",
    price: 10,
    stock: 2,
  },
  {
    id: "2",
    name: "Produto 2",
    description: "Descrição do produto 2",
    type: "socks",
    gender: "male",
    size: "xs",
    price: 123.23,
    stock: 2,
  },
  {
    id: "4",
    name: "Produto 4",
    description: "Descrição do produto 4",
    type: "shirt",
    gender: "female",
    size: "xl",
    price: 40,
    stock: 2,
  },
  {
    id: "5",
    name: "Produto 5",
    description: "Descrição do produto 5",
    type: "hat",
    gender: "unisex",
    size: "unique",
    price: 50,
    stock: 2,
  },
];

const columns: ColumnDef<Product>[] = [
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
      const amount = parseFloat(row.getValue("price"));
      const formattedAmount = Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
      return <div className={`text-right`}>{formattedAmount}</div>;
    },
  },
];

export default function AllProducts() {
  return (
    <section>
      <DataTable columns={columns} data={products} />
    </section>
  );
}
