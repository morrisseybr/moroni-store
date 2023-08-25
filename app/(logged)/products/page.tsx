import ProductsTable from "./products-table";
import Link from "next/link";
import { Plus } from "lucide-react";
import getProducts from "@/actions/get-products";

export default async function ProductsPage() {
  const firstPage = (await getProducts(null)).map((product) =>
    product.toModel()
  );
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex justify-between items-center">
        <h1>Produtos</h1>
        <Link href="/products/new">
          <Plus />
          Novo produto
        </Link>
      </div>
      <ProductsTable firstPage={firstPage} />
    </div>
  );
}
