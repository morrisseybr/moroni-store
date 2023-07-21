import { ProductSummary, ProductSummarySchema } from "@/model/Product";
import { getFirestore } from "firebase-admin/firestore";

type GetProductsResult = ProductSummary[];

export default async function getProductsSummary(): Promise<GetProductsResult> {
  const db = getFirestore();
  const productsSummaryRef = db.collection("products").doc("summary");
  const productsSummarySnapshot = await productsSummaryRef.get();
  const productsSummaryDoc = productsSummarySnapshot.data();
  if (!productsSummaryDoc) {
    throw new Error("No products summary found");
  }
  let productsSummary: ProductSummary[] = [];
  for (const productSummaryDoc in productsSummaryDoc) {
    const productSummaryData = productsSummaryDoc[productSummaryDoc];
    const productSummary = ProductSummarySchema.parse(productSummaryData);
    productsSummary.push(productSummary);
  }
  return productsSummary;
}
