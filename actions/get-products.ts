import { Product, ProductId } from "@/core/model/Product";
import { FirestoreProductRepository } from "@/db/firebase/FirestoreProductRepository";

export default async function getProducts(
  cursor?: string | null
): Promise<Product[]> {
  const repo = new FirestoreProductRepository();
  return await repo.list("name", 10, cursor ? new ProductId(cursor) : null);
}
