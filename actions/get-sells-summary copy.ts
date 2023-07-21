import { SellSummary, SellSummarySchema } from "@/model/Sell";
import { getFirestore } from "firebase-admin/firestore";

type GetSellsSummaryResult = SellSummary[];

export default async function getSellsSummary(): Promise<GetSellsSummaryResult> {
  const db = getFirestore();
  const sellsSummaryRef = db.collection("sells").doc("summary");
  const sellsSummarySnapshot = await sellsSummaryRef.get();
  const sellsSummaryDoc = sellsSummarySnapshot.data();
  if (!sellsSummaryDoc) {
    throw new Error("No sells summary found");
  }
  let sellsSummary: SellSummary[] = [];
  for (const sellSummaryDoc in sellsSummaryDoc) {
    const sellSummaryData = sellsSummaryDoc[sellSummaryDoc];
    const sellSummary = SellSummarySchema.parse(sellSummaryData);
    sellsSummary.push(sellSummary);
  }
  return sellsSummary;
}
