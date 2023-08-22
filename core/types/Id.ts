import { Value } from "./Value";

export abstract class Id extends Value<string> {
  constructor(value?: string) {
    super(value || crypto.randomUUID());
  }
  isEqualTo(id: Id): boolean {
    return this.value === id.value;
  }
  toString(): string {
    return this.value;
  }
}
