import { Product, ProductId, ProductModel } from "@/core/model/Product";
import { FirestoreProductRepository } from "@/db/firebase/FirestoreProductRepository";

export default async function listProducts(
  cursor?: ProductModel["id"] | null
): Promise<Product[]> {
  const repo = new FirestoreProductRepository();
  return await repo.list("name", 10, cursor ? new ProductId(cursor) : null);
}
