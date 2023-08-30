import { Sell, SellModel } from "@/core/model/Sell";
import { FirestoreSellRepository } from "@/db/firebase/FirestoreSellRepository";

export default async function updateSell(data: SellModel) {
  const sell = new Sell(data);
  const repo = new FirestoreSellRepository();
  await repo.update(sell);
  return await repo.read(sell.id);
}
