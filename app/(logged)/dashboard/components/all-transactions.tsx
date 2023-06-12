"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

type Transaction = {
  id: string;
  type: "income" | "outcome";
  description: string;
  amount: number;
  date: Date;
};

const transactions: Transaction[] = [
  {
    id: "1",
    type: "income",
    description: "Venda de camisetas do Moroni",
    amount: 120,
    date: new Date("2021-09-01 09:00:00"),
  },
  {
    id: "2",
    type: "income",
    description: "Venda de camisetas do Moroni",
    amount: 60,
    date: new Date("2021-09-01 09:00:00"),
  },
  {
    id: "3",
    type: "income",
    description: "Venda de camisetas do Moroni",
    amount: 50,
    date: new Date("2021-09-01 09:00:00"),
  },
  {
    id: "4",
    type: "income",
    description: "Venda de camisetas do Moroni",
    amount: 150,
    date: new Date("2021-09-01 09:00:00"),
  },
  {
    id: "5",
    type: "income",
    description: "Venda de camisetas do Moroni",
    amount: 120,
    date: new Date("2021-09-01 09:00:00"),
  },
  {
    id: "6",
    type: "income",
    description: "Venda de camisetas do Moroni",
    amount: 180,
    date: new Date("2021-09-01 09:00:00"),
  },
  {
    id: "7",
    type: "income",
    description: "Venda de camisetas do Moroni",
    amount: 50,
    date: new Date("2021-09-01 09:00:00"),
  },
  {
    id: "8",
    type: "income",
    description: "Venda de camisetas do Moroni",
    amount: 50,
    date: new Date("2021-09-01 09:00:00"),
  },
  {
    id: "9",
    type: "income",
    description: "Venda de camisetas do Moroni",
    amount: 120,
    date: new Date("2021-09-01 09:00:00"),
  },

  {
    id: "10",
    type: "outcome",
    description: "Compra de camisetas do Moroni",
    amount: 2400,
    date: new Date("2021-09-01 09:00:00"),
  },
  {
    id: "11",
    type: "outcome",
    description: "Compra de camisetas do Moroni",
    amount: 2400,
    date: new Date("2021-09-01 09:00:00"),
  },
  {
    id: "12",
    type: "outcome",
    description: "Compra de camisetas do Moroni",
    amount: 2400,
    date: new Date("2021-09-01 09:00:00"),
  },
  {
    id: "13",
    type: "outcome",
    description: "Compra de camisetas do Moroni",
    amount: 2400,
    date: new Date("2021-09-01 09:00:00"),
  },
];

const columns: ColumnDef<Transaction>[] = [
  {
    header: "Descrição",
    accessorKey: "description",
  },
  {
    header: "Data",
    accessorKey: "date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(date);
      return <div>{formattedDate}</div>;
    },
  },
  {
    header: () => <div className="text-right">Valor</div>,
    accessorKey: "amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formattedAmount = Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
      return (
        <div
          className={`text-right ${
            row.original.type === "outcome" ? "text-error" : "text-success"
          }`}
        >
          {formattedAmount}
        </div>
      );
    },
  },
];

export default function AllTransactions() {
  return (
    <section>
      <h2>Transações</h2>
      <DataTable columns={columns} data={transactions} />
    </section>
  );
}
