import { Sell, SellId, SellModel } from "@/core/model/Sell";
import { FirestoreSellRepository } from "@/db/firebase/FirestoreSellRepository";

export default async function getSell(id: SellModel["id"]): Promise<Sell> {
  const repo = new FirestoreSellRepository();
  return await repo.read(new SellId(id));
}
