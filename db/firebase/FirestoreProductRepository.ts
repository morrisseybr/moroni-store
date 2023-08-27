import { app } from "@/config/firebase-admin";
import {
  Product,
  ProductId,
  ProductRepository,
  ProductModel,
} from "@/core/model/Product";
import { getFirestore } from "firebase-admin/firestore";

export class FirestoreProductRepository extends ProductRepository {
  static readonly PRODUCTS_PATH = "products";

  #collection = getFirestore(app)
    .collection(FirestoreProductRepository.PRODUCTS_PATH)
    .withConverter({
      toFirestore: (entity: Product) => {
        return entity.toModel();
      },
      fromFirestore: (snapshot) => {
        const data = snapshot.data();
        const model = ProductModel.parse(data);
        return new Product(model);
      },
    });

  async create(product: Product): Promise<void> {
    const w = await this.#collection.doc(product.id.value).create(product);
  }
  async read(id: ProductId): Promise<Product> {
    const docSnapshot = await this.#collection.doc(id.value).get();
    const product = docSnapshot.data();
    if (!product) {
      throw new Error("Document not found");
    }
    return product;
  }
  async update(product: Product): Promise<void> {
    const doc = this.#collection.doc(product.id.value);
    await doc.update(product);
  }
  async delete(id: ProductId): Promise<void> {
    await this.#collection.doc(id.value).delete({ exists: true });
  }
  async list(
    order: string,
    limit: number,
    cursorId: ProductId | null
  ): Promise<Product[]> {
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
