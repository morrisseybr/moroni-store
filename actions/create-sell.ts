import { Sell, SellId, SellModel } from "@/core/model/Sell";
import { FirestoreSellRepository } from "@/db/firebase/FirestoreSellRepository";

export default async function createSell(data: Omit<SellModel, "id">) {
  const newId = new SellId();
  const sell = new Sell({ id: newId.value, ...data });
  const repo = new FirestoreSellRepository();
  await repo.create(sell);
  return await repo.read(sell.id);
}
