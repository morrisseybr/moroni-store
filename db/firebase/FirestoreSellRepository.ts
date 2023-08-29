import { app } from "@/config/firebase-admin";
import { Sell, SellId, SellRepository, SellModel } from "@/core/model/Sell";
import { getFirestore } from "firebase-admin/firestore";

export class FirestoreSellRepository extends SellRepository {
  static readonly SELL_PATH = "products";

  #collection = getFirestore(app)
    .collection(FirestoreSellRepository.SELL_PATH)
    .withConverter({
      toFirestore: (entity: Sell) => {
        return entity.toModel();
      },
      fromFirestore: (snapshot) => {
        const data = snapshot.data();
        const model = SellModel.parse(data);
        return new Sell(model);
      },
    });

  async create(sell: Sell): Promise<void> {
    await this.#collection.doc(sell.id.value).create(sell);
  }
  async read(id: SellId): Promise<Sell> {
    const docSnapshot = await this.#collection.doc(id.value).get();
    const sell = docSnapshot.data();
    if (!sell) {
      throw new Error("Document not found");
    }
    return sell;
  }
  async update(sell: Sell): Promise<void> {
    await this.#collection.doc(sell.id.value).set(sell);
  }
  async delete(id: SellId): Promise<void> {
    await this.#collection.doc(id.value).delete({ exists: true });
  }
  async list(
    order: string,
    limit: number,
    cursorId: SellId | null
  ): Promise<Sell[]> {
    if (!cursorId) {
      const querySnapshot = await this.#collection
        .orderBy(order)
        .limit(limit)
        .get();
      return querySnapshot.docs.map((doc) => doc.data());
    }
    const cursorSnapshot = await this.#collection.doc(cursorId.value).get();
    const querySnapshot = await this.#collection
      .orderBy(order)
      .limit(limit)
      .startAfter(cursorSnapshot)
      .get();
    return querySnapshot.docs.map((doc) => doc.data());
  }
}
