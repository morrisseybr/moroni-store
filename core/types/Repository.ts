import { Entity } from "./Entity";
import { Id } from "./Id";
import { Model } from "./Model";

export abstract class Repository<
  I extends Id,
  M extends Model,
  E extends Entity<I, M>
> {
  abstract create(entity: E): Promise<void>;
  abstract read(id: I): Promise<E>;
  abstract update(entity: E): Promise<void>;
  abstract delete(id: I): Promise<void>;
  abstract list(order: string, limit: number, cursorId: I | null): Promise<E[]>;
}
