import { Product, ProductId, ProductModel } from "@/core/model/Product";
import { FirestoreProductRepository } from "@/db/firebase/FirestoreProductRepository";

export default async function createProduct(data: Omit<ProductModel, "id">) {
  const newId = new ProductId();
  const product = new Product({ id: newId.value, ...data });
  const repo = new FirestoreProductRepository();
  await repo.create(product);
  return await repo.read(product.id);
}
