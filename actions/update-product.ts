import { Product, ProductModel } from "@/core/model/Product";
import { FirestoreProductRepository } from "@/db/firebase/FirestoreProductRepository";

export default async function updateProduct(data: ProductModel) {
  const product = new Product(data);
  const repo = new FirestoreProductRepository();
  await repo.update(product);
  return await repo.read(product.id);
}
