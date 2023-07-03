"use server";

import { Product, ProductSchema } from "@/model/Product";
import { getFirestore } from "firebase-admin/firestore";

type GetProductsParams = {
  lastProductId?: string;
  limit?: number;
};

type GetProductsResult = {
  products: Product[];
  total: number;
};

export default async function getProducts({
  lastProductId,
  limit = 10,
}: GetProductsParams): Promise<GetProductsResult> {
  const db = getFirestore();
  const productsRef = db.collection("products");
  const productsSnapshot = await productsRef
    .limit(limit)
    .orderBy("id")
    .startAt(lastProductId || "")
    .get();
  const products = productsSnapshot.docs.map((doc) =>
    ProductSchema.parse(doc.data())
  );
  const countSnapshot = await productsRef.count().get();
  const total = countSnapshot.data().count;
  return { products, total };
}
