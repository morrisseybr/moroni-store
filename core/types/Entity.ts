import { Id } from "./Id";
import { Model } from "./Model";

export abstract class Entity<T extends Id, U extends Model> {
  readonly #id: T;
  constructor(id: T) {
    this.#id = id;
  }
  get id(): T {
    return this.#id;
  }
  abstract toModel(): U;
}
