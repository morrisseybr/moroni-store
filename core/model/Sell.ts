import { z } from "zod";
import { Entity } from "../types/Entity";
import { Id } from "../types/Id";
import { Repository } from "../types/Repository";

export class SellId extends Id {}

export const SellModel = z.object({
  id: z.string(),
  date: z.date(),
  bag: z.array(
    z.object({
      productId: z.string(),
      price: z.number().nonnegative(),
      quantity: z.number().nonnegative(),
    })
  ),
  customer: z
    .object({
      name: z.string().nonempty(),
      email: z.string().email(),
      phone: z.string().nonempty(),
    })
    .nullable(),
  payment: z.object({
    method: z.enum(["cash", "card"]),
    change: z.number().nonnegative(),
  }),
  discount: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  total: z.number().nonnegative(),
});

export type SellModel = z.infer<typeof SellModel>;

export class Sell extends Entity<SellId, SellModel> {
  #date: SellModel["date"];
  #bag: SellModel["bag"];
  #customer: SellModel["customer"];
  #payment: SellModel["payment"];
  #discount: SellModel["discount"];
  #tax: SellModel["tax"];
  #total: SellModel["total"];

  constructor(model: SellModel) {
    super(new SellId(model.id));
    const parsedModel = SellModel.parse(model);
    this.#date = parsedModel.date;
    this.#bag = parsedModel.bag;
    this.#customer = parsedModel.customer;
    this.#payment = parsedModel.payment;
    this.#discount = parsedModel.discount;
    this.#tax = parsedModel.tax;
    this.#total = parsedModel.total;
  }
  toModel(): SellModel {
    return {
      id: this.id.value,
      date: this.#date,
      bag: this.#bag,
      customer: this.#customer,
      payment: this.#payment,
      discount: this.#discount,
      tax: this.#tax,
      total: this.#total,
    };
  }
}

export abstract class SellRepository extends Repository<
  SellId,
  SellModel,
  Sell
> {}
