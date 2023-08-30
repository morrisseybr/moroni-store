import Link from "next/link";
import { Plus } from "lucide-react";
import SellsTable from "./sells-table";
import { trpcCaller } from "@/trpc/server";

export default async function SellsPage() {
  const firstPage = await trpcCaller.sells.list({ cursor: null });
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex justify-between items-center">
        <h1>Vendas</h1>
        <Link href="/sells/new">
          <Plus />
          Nova venda
        </Link>
      </div>
      <SellsTable firstPage={firstPage} />
    </div>
  );
}
