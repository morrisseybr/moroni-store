import getProducts from "@/actions/get-products";
import ProductsTable from "./components/products-table";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ProductsPage() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex justify-between items-center">
        <h1>Produtos</h1>
        <Link href="/products/new">
          <Plus />
          Novo produto
        </Link>
      </div>
      <ProductsTable />
    </div>
  );
}
