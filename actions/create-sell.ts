import { SellSchema } from "@/model/Sell";
import { getFirestore } from "firebase-admin/firestore";
import * as z from "zod";

const createSellSchema = z.object({
  date: z.date(),
  bag: z.array(
    z.object({
      productId: z.string().nonempty(),
      productName: z.string().nonempty(),
      price: z.string().nonempty().optional(),
      quantity: z.number().positive(),
    })
  ),
});

export type CreateSellFormData = z.infer<typeof createSellSchema>;

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
