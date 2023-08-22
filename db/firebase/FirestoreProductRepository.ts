import { app } from "@/config/firebase";
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
        return new Product(new ProductId(snapshot.id), model);
      },
    });

  async create(product: Product): Promise<void> {
    await this.#collection.doc(product.id.value).create(product);
  }
  async read(id: ProductId): Promise<Product> {
    const docSnapshot = await this.#collection.doc(id.value).get();
    const data = docSnapshot.data();
    if (!data) {
      throw new Error("Document not found");
    }
    const model = ProductModel.parse(data);
    return new Product(new ProductId(docSnapshot.id), model);
  }
  async update(product: Product): Promise<void> {
    const doc = this.#collection.doc(product.id.value);
    await doc.update(product);
  }
  async delete(id: ProductId): Promise<void> {
    await this.#collection.doc(id.value).delete({ exists: true });
  }
}
