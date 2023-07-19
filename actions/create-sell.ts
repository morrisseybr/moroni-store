"use server";

import { SellSchema } from "@/model/Sell";
import { getFirestore } from "firebase-admin/firestore";

const createSellSchema = SellSchema.omit({ id: true });

export default async function createSell(formData: FormData) {
  const data = createSellSchema.parse(Object.fromEntries(formData.entries()));
  const db = getFirestore();
  const docRef = db.collection("sells").doc();
  const newSell = SellSchema.parse({ id: docRef.id, ...data });
  await docRef.set(newSell);
  const newSellSummary = SellSchema.parse(newSell);
  const sellsSummaryRef = db.collection("sells").doc("summary");
  await sellsSummaryRef.update({
    [newSellSummary.id]: newSellSummary,
  });
}
