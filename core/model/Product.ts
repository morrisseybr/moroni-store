import { z } from "zod";
import { Entity } from "../types/Entity";
import { Id } from "../types/Id";
import { Repository } from "../types/Repository";

export class ProductId extends Id {}

export const ProductType = z.enum([
  "shirt",
  "pants",
  "shoes",
  "hat",
  "socks",
  "underwear",
  "accessories",
  "other",
]);
export type ProductType = z.infer<typeof ProductType>;

export const ProductGender = z.enum(["male", "female", "unisex"]);
export type ProductGender = z.infer<typeof ProductGender>;

export const ProductSize = z.enum([
  "number",
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "xxxl",
  "unique",
]);
export type ProductSize = z.infer<typeof ProductSize>;

export const ProductModel = z.object({
  id: z.string(),
  name: z.string().nonempty(),
  description: z.string(),
  type: ProductType,
  gender: ProductGender,
  size: ProductSize,
  number: z.number().nonnegative(),
  price: z.number().nonnegative(),
  stock: z.number().nonnegative(),
});

export type ProductModel = z.infer<typeof ProductModel>;

export class Product extends Entity<ProductId, ProductModel> {
  #name: ProductModel["name"];
  #description: ProductModel["description"];
  #type: ProductModel["type"];
  #gender: ProductModel["gender"];
  #size: ProductModel["size"];
  #number: ProductModel["number"];
  #price: ProductModel["price"];
  #stock: ProductModel["stock"];

  constructor(model: ProductModel) {
    super(new ProductId(model.id));
    const parsedModel = ProductModel.parse(model);
    this.#name = parsedModel.name;
    this.#description = parsedModel.description;
    this.#type = parsedModel.type;
    this.#gender = parsedModel.gender;
    this.#size = parsedModel.size;
    this.#number = parsedModel.number;
    this.#price = parsedModel.price;
    this.#stock = parsedModel.stock;
  }
  toModel(): ProductModel {
    return {
      id: this.id.value,
      name: this.#name,
      description: this.#description,
      type: this.#type,
      gender: this.#gender,
      size: this.#size,
      number: this.#number,
      price: this.#price,
      stock: this.#stock,
    };
  }
}

export abstract class ProductRepository extends Repository<
  ProductId,
  ProductModel,
  Product
> {}
