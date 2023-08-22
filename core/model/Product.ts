import { Entity } from "../types/Entity";
import { Id } from "../types/Id";
import { Model } from "../types/Model";
import { Value } from "../types/Value";

export class ProductId extends Id {}

export interface ProductModel extends Model {
  name: string;
  price: number;
  quantity: number;
}

export class Product extends Entity<ProductId, ProductModel> {
  #name: string;
  #price: number;
  #quantity: number;
  constructor(id: ProductId, model: ProductModel) {
    super(id);
    this.#name = model.name;
    this.#price = model.price;
    this.#quantity = model.quantity;
  }
  toModel(): ProductModel {
    return {
      name: this.#name,
      price: this.#price,
      quantity: this.#quantity,
    };
  }
}
