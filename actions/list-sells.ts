import { Sell, SellId, SellModel } from "@/core/model/Sell";
import { FirestoreSellRepository } from "@/db/firebase/FirestoreSellRepository";

export default async function listSells(
  cursor?: SellModel["id"] | null
): Promise<Sell[]> {
  const repo = new FirestoreSellRepository();
  return await repo.list("name", 10, cursor ? new SellId(cursor) : null);
}
