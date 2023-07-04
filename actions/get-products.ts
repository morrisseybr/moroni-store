"use server";

import { Product, ProductSchema } from "@/model/Product";
import {
  DocumentData,
  QuerySnapshot,
  getFirestore,
} from "firebase-admin/firestore";

type GetProductsParams = {
  limit?: number;
} & (
  | {
      beforeProductId?: string;
      afterProductId?: never;
    }
  | {
      beforeProductId?: never;
      afterProductId?: string;
    }
);

type GetProductsResult = {
  products: Product[];
  total: number;
};

export default async function getProducts({
  beforeProductId,
  afterProductId,
  limit = 2,
}: GetProductsParams): Promise<GetProductsResult> {
  const db = getFirestore();
  const productsRef = db.collection("products");

  const productsQuery = productsRef.orderBy("name");
  let productsSnapshot: QuerySnapshot<DocumentData>;

  if (beforeProductId)
    productsSnapshot = await productsQuery
      .limitToLast(limit)
      .endBefore(await productsRef.doc(beforeProductId).get())
      .get();
  else if (afterProductId)
    productsSnapshot = await productsQuery
      .limit(limit)
      .startAfter(await productsRef.doc(afterProductId).get())
      .get();
  else productsSnapshot = await productsQuery.limit(limit).get();

  const products = productsSnapshot.docs.map((doc) =>
    ProductSchema.parse(doc.data())
  );
  const countSnapshot = await productsRef.count().get();
  const total = countSnapshot.data().count;
  return { products, total };
}
