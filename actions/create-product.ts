import { Product, ProductId, ProductModel } from "@/core/model/Product";
import { FirestoreProductRepository } from "@/db/firebase/FirestoreProductRepository";

export default async function createProduct(data: unknown) {
  const model = ProductModel.parse(data);
  const product = new Product(new ProductId(), model);
  const repo = new FirestoreProductRepository();
  await repo.create(product);
}
