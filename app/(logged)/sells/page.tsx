import Link from "next/link";
import { Plus } from "lucide-react";
import SellsTable from "./components/sells-table";
import getSellsSummary from "@/actions/get-sells-summary copy";

export default async function SellsPage() {
  const sellsSummary = await getSellsSummary();
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex justify-between items-center">
        <h1>Vendas</h1>
        <Link href="/products/new">
          <Plus />
          Nova venda
        </Link>
      </div>
      <SellsTable sellsSummary={sellsSummary} />
    </div>
  );
}
