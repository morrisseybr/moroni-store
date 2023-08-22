export abstract class Value<T> {
  readonly #value: T;
  get value(): T {
    return this.#value;
  }
  constructor(value: T) {
    this.#value = value;
  }
  abstract isEqualTo(value: Value<T>): boolean;
  abstract toString(): string;
}
