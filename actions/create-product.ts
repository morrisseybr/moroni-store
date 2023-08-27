import { Product, ProductId, ProductModel } from "@/core/model/Product";
import { FirestoreProductRepository } from "@/db/firebase/FirestoreProductRepository";
import { z } from "zod";

export const CreateProductModel = ProductModel.omit({ id: true });
export type CreateProductModel = z.infer<typeof CreateProductModel>;

export default async function createProduct(data: CreateProductModel) {
  const newId = new ProductId();
  const product = new Product({ id: newId.value, ...data });
  const repo = new FirestoreProductRepository();
  await repo.create(product);
  return await repo.read(product.id);
}
