"use server";

import { Product, ProductSchema } from "@/model/Product";
import { getFirestore } from "firebase-admin/firestore";

export default async function getProduct(id: string): Promise<Product> {
  const db = getFirestore();
  const productRef = db.collection("products").doc(id);
  const productSnapshot = await productRef.get();
  return ProductSchema.parse(productSnapshot.data());
}
